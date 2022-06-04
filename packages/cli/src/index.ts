import minimist from "minimist";
import { exit, cwd } from "node:process";

import { serve } from "@kyedoesdev/lente-core";

(async () => {
    console.log("lente dev server starting");

    const argv = minimist(process.argv.slice(2));
    const port = argv.port ?? 3000;
    const path = argv.path ?? cwd()

    console.log(`will serve ${path} to localhost:${port}`);

    await serve({
      port,
      path 
    });

})();
