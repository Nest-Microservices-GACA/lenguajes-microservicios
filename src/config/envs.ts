import 'dotenv/config';

import * as joi from 'joi';

interface EnvVars {
  DB_HOST: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  DB_PORT: string;
  PORT: number;
}

const envsSchema = joi.object({
  DB_HOST: joi.string().required(),
  DB_USERNAME: joi.string().required(),
  DB_PASSWORD: joi.string().required(),
  DB_NAME: joi.string().required(),
  DB_PORT: joi.string().required(),
  PORT: joi.number().required(),
})
.unknown(true);

const { error, value } = envsSchema.validate( process.env );


if ( error ) {
  throw new Error(`Config validation error: ${ error.message }`);
}

const envVars:EnvVars = value;


export const envs = {
  DB_HOST: envVars.DB_HOST,
  DB_USERNAME: envVars.DB_USERNAME,
  DB_PASSWORD: envVars.DB_PASSWORD,
  DB_NAME: envVars.DB_NAME,
  DB_PORT: envVars.DB_PORT,
  port: envVars.PORT,
};