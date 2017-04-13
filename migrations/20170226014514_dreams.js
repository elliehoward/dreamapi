"use strict";

exports.up = function(knex, Promise) {
  return knex.schema.createTable('dreams', function (table) {
  // table.increments();
  // table.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
  table.string('id').primary().notNullable().defaultTo('');
  table.string('title').notNullable().defaultTo('');
  table.text('description', 'longtext').notNullable().defaultTo('');
  table.string('dream_image_url').notNullable().defaultTo('');
  table.string('date').notNullable().defaultTo('');
  table.boolean('private').defaultTo(false);
  table.timestamps(true, true);
  table.integer('votes').notNullable().defaultTo(0);
});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('dreams');
};
