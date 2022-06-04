import { watch } from "node:fs/promises";
import { EventEmitter } from "node:events";

export interface LenteFileWatcherOptions {
  path: string;
}

export class LenteFileWatcher extends EventEmitter {

  constructor(private options: LenteFileWatcherOptions) {
    super();
  }

  async start() {
    const watcher = watch(this.options.path);
    for await(const { eventType, filename } of watcher) {
      if (eventType === 'change') this.emit('change', filename);
    }
  }

};
