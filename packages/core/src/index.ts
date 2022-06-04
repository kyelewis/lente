import { LenteServer } from './server';
import { LenteFileWatcher } from './watch';

export const serve = async ({ port, path }) => {

  const server = new LenteServer({
    port,
    path
  });

  const watcher = new LenteFileWatcher({
    path
  });

  server.on('log', console.log);
  watcher.on('change', (file) => server.reload(file));

  await Promise.all([server.start(), watcher.start()]);

};
