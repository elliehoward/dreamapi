"use strict";

exports.up = function(knex, Promise) {
  return knex.schema.createTable('dreams', function (table) {
  table.increments();
  table.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
  table.string('name').notNullable().defaultTo('');
  table.text('description', 'longtext').notNullable().defaultTo('');
  table.string('dream_image_url').notNullable().defaultTo('');
  table.string('date').notNullable().defaultTo('');
  table.timestamps(true, true);
});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('dreams');
};
