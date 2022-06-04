import fastify from "fastify";
import websocket from "@fastify/websocket";
import { contentType } from "mime-types";
import { esbuildPlugin } from '@kyedoesdev/lente-plugin-esbuild';

import { exit, cwd } from "node:process";
import { join, parse } from "node:path";
import { readFile, exists} from "node:fs";
import { promisify } from "node:util";
import { EventEmitter } from "node:events";

import { createErrorHtml } from '@kyedoesdev/lente-error';
import { getWebSocketScriptContents } from './websocket';

const readFileAsync = promisify(readFile);
const existsAsync = promisify(exists);

const esbuildExtensions = new Set([".js", ".ts", ".jsx", ".tsx"]);
const htmlExtensions = new Set([".html"]);

export interface LenteServerOptions {
  path: string;
  port: number
};

export class LenteServer extends EventEmitter {

  private fastify = fastify();

  constructor(private options: LenteServerOptions) {
    super();
    this.setupFastify();
  }

  setupFastify() {
    this.fastify.register(websocket);
    this.fastify.get("/", { websocket: true }, this.onOpenWebSocket.bind(this));
    this.fastify.get("/__websocket.js", this.onGetWebSocketScript.bind(this));
    this.fastify.get("/:file", this.onRequestFile.bind(this));
  }

  onOpenWebSocket() {
    this.emit('log', 'Client Connected to WebSocket');
  }

  onGetWebSocketScript(_, reply) {
    return reply.type("text/javascript").send(getWebSocketScriptContents());
  }

  async onRequestFile(request, reply) {

    // @todo dissalow path traversal
    const url = request.url === "/" ? "index.html" : request.url;
    this.emit("log", `Servicing a request for ${url}`);

    const path = join(this.options.path, url);
    const { base, ext } = parse(path);

    // esbuild/js/ts handler
    if(esbuildExtensions.has(ext)) 
      return await esbuildPlugin(request, reply, path, base);

  // does path exist @todo move further upwards, allow plugin to register additional extensions
  if (!(await existsAsync(path)))
    return reply
      .code(404)
      .type("text/html")
      .send(createErrorHtml(base, [`Path not found ${path}`]));

      // Read file in
      const buffer = await readFileAsync(path);

      // HTML handler
      if(htmlExtensions.has(ext)) 
        return reply.type('text/html').send(wrapHtmlWithWebSocketScript(html));

      return reply.type(contentType(ext)).send(buffer);
  }

  start() {
    this.emit("log", `Starting HTTP server on port ${this.options.port}`);
    return this.fastify.listen(this.options.port); 
  }

  reload(file: string) {
    this.fastify.websocketServer.clients.forEach((client) => 
      client.readyState === 1 && client.send(`/${file}`));
  }

}

export const wrapHtmlWithWebSocketScript = (html: string | Buffer): string => `<script src="/__websocket.js"></script>${html}`;
