import {
  getConnectionOptions,
  createConnection,
  ConnectionOptions
} from 'typeorm';

export const createTypeormConn = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  return process.env.NODE_ENV === 'production'
    ? createConnection({
        ...connectionOptions,
        url: process.env.DATABASE_URL,
        name: 'default'
      } as ConnectionOptions)
    : createConnection({ ...connectionOptions, name: 'default' });
};
