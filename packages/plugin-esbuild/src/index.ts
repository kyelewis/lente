import { build } from 'esbuild';
import { createErrorHtml } from '@kyedoesdev/lente-error';

export const esbuildPlugin = async (request, reply, path, base) => {

    try {

      const result = await build({
        entryPoints: [path],
        bundle: true,
        write: false,
      });

      return reply.type("text/javascript").send(result.outputFiles?.[0]?.text);

    } catch (error) {

      return reply
        .code(500)
        .type("text/html")
        .send(createErrorHtml(base, ...error.errors.map((error) => error.text)));
    }
  };

