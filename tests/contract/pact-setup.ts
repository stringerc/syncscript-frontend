import { Pact } from '@pact-foundation/pact';
import path from 'path';

export const provider = new Pact({
  consumer: 'SyncScript Frontend',
  provider: 'SyncScript Backend',
  port: 1234, // Mock server port
  log: path.resolve(process.cwd(), 'logs', 'pact.log'),
  dir: path.resolve(process.cwd(), 'pacts'),
  logLevel: 'info',
  spec: 2,
});

