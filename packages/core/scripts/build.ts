import { join } from "node:path";
import { build } from 'esbuild';

(async() => {

  await build({
    entryPoints: [ join(__dirname, '../src/index.ts') ],
    platform: "node",
    format: "cjs",
    bundle: true,
    outdir: join(__dirname, '../lib')
  });

})();
