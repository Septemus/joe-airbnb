import { getConnectionOptions, createConnection } from 'typeorm';

export const createTestConn = async (resetDB = false) => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  return createConnection({
    ...connectionOptions,
    name: 'default',
    synchronize: resetDB,
    dropSchema: resetDB
  });
};
