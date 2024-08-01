import knex, { type Knex } from "knex";
import knexConfig from "./knexfile";
import { envs } from "@/core";

const environment: Knex.Config = knexConfig[envs.NODE_ENV] || knexConfig["development"];
export const db: Knex = knex(environment);