
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'ellie', email: 'ellie@gmail.com', hashed_password: 'password'},
        {username: 'victor', email: 'victor@gmail.com', hashed_password: 'password'},
        {username: 'namkai', email: 'namkai@gmail.com', hashed_password: 'password'}
      ]);
    });
};
