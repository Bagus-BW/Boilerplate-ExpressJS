import { get } from "env-var";

export const envs = {
  PORT: get("PORT").required().asPortNumber(),
  API_PREFIX: get("DEFAULT_API_PREFIX").default("/api/v1").asString(),
  NODE_ENV: get("NODE_ENV").default("development").asString(),
  DB_HOST: get("DB_HOST").required().asString(),
  DB_USER: get("DB_USER").required().asString(),
  DB_PASSWORD: get("DB_PASSWORD").required().asString(),
  DB_NAME: get("DB_NAME").required().asString()
};