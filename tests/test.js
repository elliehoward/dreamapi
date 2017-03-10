"use strict";

process.env.NODE_ENV = "development";

const { suite, test } = require("mocha");
const request = require("supertest");
const knex = require("../knex");
const app = require("../app");


describe ("GET /api/dreams", function() {
    beforeEach(function(done) {
      knex.migrate.rollback()
      .then(function() {
        knex.migrate.latest()
        .then(function() {
          return knex.seed.run()
          .then(function() {
            done();
          });
        });
      });
    });


  it ("should return all dreams", (done) => {
    request(app)
      .get("/api/dreams")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect((res) => {
          res.body.forEach(function(cur){
              delete cur.created_at;
              delete cur.updated_at;
          })
      })
      .expect(200, [
          {
            id: 1,
            name: 'Galvanize is really the matrix.',
            description: 'I had a dream where I was working on the computers in the lab at Galvanize and when my cohort would work on the computers I remember feeling like the monitors sucked us into a train ride somewhere else outside that would not stop and I remember trying to help someone that was falling off and they dragged themselves up, despite the pain they were going through trying to get back on the train. Later we were on the train again and that same person got left behind. When we got to our destination we found ourselves inside giant containers full of some kind of purple gel. It was much like when Neo woke up in the matrix, only in a very green area outdoors. Maybe a patio that reminded me of some kind of mario level. I saw my sister and she looked at me and told me with her eyes that she knew all this had been going on and she was helping. I felt shocked.',
            dream_image_url: 'images/dreams/matrix.jpeg',
            date: '2/22/17',
            user_id: 3
          },
          {
            id: 2,
            name: 'Spiders were everywhere!',
            description: 'I dreamed that my sister and I were trapped in my old house and it was filled with spiders. They would come in waves. We had to escape while the spiders were gone, and hide under tissues in my closet if the spiders came out. They would crawl over everything. I remember looking for my sister when the spiders left but I could not find her. I woke up before making it outdoors.',
            dream_image_url: 'images/dreams/spiderweb.jpeg',
            date: '2/23/17',
            user_id: 1
          },
          {
            id: 3,
            name: 'my sister almost melted',
            description: 'I dreamed my sister was behind a couch in the computer room. If she were to fall all the way behind the couch I knew that she should melt. I kept trying to pull her up but she was hard to pull. Then a clone of her was in her room at the doorway, telling me to come play with her. I felt like she was a distraction from me saving my sister from melting. I woke up before anything really happened.',
            dream_image_url: 'images/dreams/sista.jpg',
            date: '2/24/17',
            user_id: 1
          },
          {
            id: 4,
            name: 'Inside of a blackhole',
            description: 'What happens in a blackhole? what happens when you go into a blackhole in dreamland? Try it in your next lucid dream and let me know!',
            dream_image_url: 'images/dreams/spaceee.jpeg',
            date: '2/25/17',
            user_id: 2
          }
      ], done);
  });
});

describe ("POST /api/dreams", function() {
    it ("should insert a dream", (done) => {
      request(app)
        .post("/api/dreams")
        .set("Accept", "application/json")
        .send({
          name: "my new dream",
          description: "I had a weird dream",
          dream_image_url: "",
          user_id: 1
        })
        .expect("Content-Type", /json/)
        .expect(200, [{
          id: 5,
          name: "my new dream",
          description: "I had a weird dream",
          dream_image_url: "",
          user_id: 1
        }], done);
    });
});
