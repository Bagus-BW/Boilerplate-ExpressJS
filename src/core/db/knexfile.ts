import * as path from "path";
import { type Knex } from "knex";
import { envs } from "@/core/config";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      host: envs.DB_HOST,
      user: envs.DB_USER,
      password: envs.DB_PASSWORD,
      database: envs.DB_NAME,
    },
    pool:{
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.resolve(__dirname, "migrations"),
    },
    seeds: {
      directory: path.resolve(__dirname, "seeds"),
    },
  },
  production: {
    client: "pg",
    connection: {
      host: envs.DB_HOST,
      user: envs.DB_USER,
      password: envs.DB_PASSWORD,
      database: envs.DB_NAME,
    },
    migrations: {
      directory: path.resolve(__dirname, "migrations"),
      extension: "ts",
      tableName: "migrations_history"
    },
    seeds: {
      directory: path.resolve(__dirname, "seeds"),
      extension: "ts"
    },
  }
};

export default config;