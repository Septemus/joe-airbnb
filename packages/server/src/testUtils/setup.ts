import { startServer } from '../startServer';
import { AddressInfo } from 'net';

export const setup = async () => {
  const server = await startServer();
  const { port } = server.address() as AddressInfo;
  process.env.TEST_HOST = `http://127.0.0.1:${port}`;
};
