#!/usr/bin/env node

/**
 * This is a sample HTTP server.
 * Replace this with your implementation.
 */

import 'dotenv/config';
import { createServer, IncomingMessage, ServerResponse } from 'http';
import { Config } from './config.js';

export default async function main(port: number = Config.port) {
  const requestListener = async (request: IncomingMessage, response: ServerResponse) => {
    response.setHeader('content-type', 'text/plain;charset=utf8');
    response.writeHead(200, 'OK');
  };
  const server = createServer(requestListener);
  server.listen(port);
  return server;
}
