
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('dreams').del()
    .then(function () {
      // Inserts seed entries
      return knex('dreams').insert([
          {
            name: 'Galvanize is really the matrix',
            description: 'On-demand sand castle construction expertise.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?',
            dream_image_url: 'images/dreams/guard.jpg',
            date: '2/22/17',
            user_id: 3
          },
          {
            name: 'Michael was a kid again',
            description: 'Earn points when your favorite politicians pass legislation. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?',
            dream_image_url: 'images/dreams/lilmichael.jpg',
            date: '2/23/17',
            user_id: 1
          },
          {
            name: 'my sister almost melted',
            description: 'We already have your measurements and shipping address. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?',
            dream_image_url: 'images/dreams/sista.jpg',
            date: '2/24/17',
            user_id: 1
          },
          {
            name: 'Inside of a blackhole',
            description: 'High-minded or absent-minded? You decide. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?',
            dream_image_url: 'images/dreams/spaceee.jpeg',
            date: '2/25/17',
            user_id: 2
          }
      ]);
    });
};
