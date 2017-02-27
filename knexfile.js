'use strict';


module.exports = {

  test: {
    client: 'postgres',
    connection: 'postgres://localhost/dreamhub_test',
    seeds: {
      directory: './seeds'
  }
  },

  development: {
    client: 'postgres',
    connection: 'postgres://localhost/dreamhub'
},

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,

  }
  };
