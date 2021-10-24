import { ConnectionOptions } from 'typeorm'
import * as dotenv from 'dotenv'
import { join } from 'path'
dotenv.config()

const ormconfig: ConnectionOptions = {
  name: 'default',
  applicationName: 'default',
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  extra: {
    ssl: {
      rejectUnauthorized: false
    }
  },
  synchronize: true,
  logging: false,
  entities: [join(__dirname, 'entities/*.{ts,js}')],
  migrations: [join(__dirname, 'migrations/*.{ts,js}')],
  subscribers: [join(__dirname, 'subscribers/*.{ts,js}')],
  cli: {
    entitiesDir: join(__dirname, 'entities/*.{ts,js}'),
    migrationsDir: join(__dirname, 'migrations/*.{ts,js}'),
    subscribersDir: join(__dirname, 'subscribers/*.{ts,js}')
  }
}

export default ormconfig
