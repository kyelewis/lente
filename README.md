# lente (not as fast as vite)
A small hobby experimental dev server.

## Warning
This project is even less than half-baked right now, please don't use it for anything.
It features:
- Ill-thought out security, including simple path traversal
- Does not use streams to make sure it is as slow as possible
- Configuration is in the code, so no extensibility
- Scripts in HTML tags aren't transformed at all.

## Features
- Transforms js/ts/jsx/tsx requests with esbuild.
- A rudimentary file-watching and live-reload feature for HTML requests.

## Quick Start
```shell
npx @kyedoesdev/lente-cli --port 3001 --path my-files
```
