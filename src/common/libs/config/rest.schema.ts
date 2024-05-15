import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

export type RestSchema = {
  PORT: number;
  SALT: string;
  DATABASE_HOST: string;
  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
  DATABASE_PORT: string;
  DATABASE_NAME: string;
  UPLOAD_DIRECTORY: string;
}

export const configRestSchema = convict<RestSchema>({
  PORT: {
    doc: 'Port for incoming connections',
    format: 'port',
    env: 'PORT',
    default: 8000
  },
  SALT: {
    doc: 'Salt for password hash',
    format: String,
    env: 'SALT',
    default: null
  },
  DATABASE_HOST: {
    doc: 'IP address of the database server',
    format: 'ipaddress',
    env: 'DB_HOST',
    default: '127.0.0.1'
  },
  DATABASE_USER: {
    doc: 'Username to get database connection',
    format: String,
    env: 'DATABASE_USER',
    default: null
  },
  DATABASE_PASSWORD: {
    doc: 'Password to get database connection',
    format: String,
    env: 'DATABASE_PASSWORD',
    default: null
  },
  DATABASE_PORT: {
    doc: 'Database TCP Port',
    format: String,
    env: 'DATABASE_PORT',
    default: null
  },
  DATABASE_NAME: {
    doc: 'Database name',
    format: String,
    env: 'DATABASE_NAME',
    default: null
  },
  UPLOAD_DIRECTORY: {
    doc: 'File upload directory',
    format: String,
    env: 'UPLOAD_DIRECTORY',
    default: null
  }
});
