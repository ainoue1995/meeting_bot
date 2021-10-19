import { ConnectionOptions } from 'typeorm'
import * as dotenv from 'dotenv'
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
  entities: ['src/entities/**/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
  subscribers: ['src/subscribers/**/*.ts'],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migrations',
    subscribersDir: 'src/subscribers'
  }
}

export default ormconfig
