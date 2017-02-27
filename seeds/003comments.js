
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      // Inserts seed entries
      return knex('comments').insert([
        {user_id: 1, dream_id: 1, content: 'What a strange dream man!'},
        {user_id: 2, dream_id: 2, content: 'What a strange dream man!'},
        {user_id: 3, dream_id: 1, content: 'What a strange dream man!'}
      ]);
    });
};
