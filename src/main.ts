// #!/usr/bin/env node

// /**
//  * This is a sample HTTP server.
//  * Replace this with your implementation.
//  */

// import 'dotenv/config';
// import { createServer, IncomingMessage, ServerResponse } from 'http';
// import { resolve } from 'path';
// import { fileURLToPath } from 'url';
// import { Config } from './config.js';
// import balanceCron from './cron';

// const nodePath = resolve(process.argv[1]);
// const modulePath = resolve(fileURLToPath(import.meta.url));
// const isCLI = nodePath === modulePath;

// export default async function main(port: number = Config.port) {
//   const requestListener = async (request: IncomingMessage, response: ServerResponse) => {
//     response.setHeader('content-type', 'text/plain;charset=utf8');
//     response.writeHead(200, 'OK');
//   };

//   const server = createServer(requestListener);

//   if (isCLI) {
//     server.listen(port);
//     // eslint-disable-next-line no-console
//     balanceCron();
//   }

//   return server;
// }

// if (isCLI) {
//   main();
// }
