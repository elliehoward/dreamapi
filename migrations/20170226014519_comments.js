"use strict";

exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', function (table) {
  table.increments();
  table.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
  table.integer('dream_id').notNullable().references('id').inTable('dreams').onDelete('CASCADE');
  table.text('content', 'longtext').notNullable().defaultTo('');
  table.timestamps(true, true);
});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments');
};
