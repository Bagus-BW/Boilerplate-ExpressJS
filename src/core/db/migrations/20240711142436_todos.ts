import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("todos", function (table) {
      table.increments("id");
      table.string("title").notNullable;
      table.string("description").notNullable;
      table.boolean("status").notNullable;
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("todos");
}

