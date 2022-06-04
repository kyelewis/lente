import { join } from "node:path";
import { build } from 'esbuild';

(async() => {

  await build({
    entryPoints: [ join(__dirname, '../src/index.ts') ],
    bundle: true,
    platform: 'node',
    outdir: join(__dirname, '../bin'),
    banner:{ js: "#!/usr/bin/env node" }
  });

})();
