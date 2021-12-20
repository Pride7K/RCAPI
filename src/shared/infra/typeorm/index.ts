import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (host = "database"): Promise<Connection> => {


  console.log("dropped")

  const defaultOptions = await getConnectionOptions();

  console.log("t")

  return createConnection(
    Object.assign(defaultOptions, {
      host
    })
  )
}