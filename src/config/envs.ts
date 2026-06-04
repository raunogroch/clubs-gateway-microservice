import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  CORS_ORIGIN?: string;
  NATS_SERVERS?: string[];
}

const envVarsSchema = joi
  .object({
    PORT: joi.number().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required(),
    CORS_ORIGIN: joi.string().optional(),
  })
  .unknown(true);

const { error, value } = envVarsSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  corsOrigin: envVars.CORS_ORIGIN,
  natsServers: envVars.NATS_SERVERS,
};
