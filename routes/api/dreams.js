'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../../knex');

router.route('/').get(function(req, res, next){
    knex('dreams')
    .orderBy('votes').then(function(dreams){
        res.json(dreams);
    }).catch(function(err){
        next(new Error(err));
    });
});

router.route('/:id').get(function(req, res, next){
    var dreamId =  Number(req.params.id);
    knex('dreams').where('id', dreamId)
    .then(function(specificDream){
        res.json(specificDream);
    }).catch(function(err){
        next(new Error(err));
    });
});

router.route("/").post(function (req, res, next) {
    console.log(req.body, 'i am the body')
  knex('dreams')
  .insert({
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    dream_image_url: req.body.dreamImg,
    private: false,
    date: req.body.date,
    votes: req.body.votes || 0
  })
  .returning("*")
  .then(function (dreams) {
    res.setHeader("Content-Type", "application/json");
    res.json(dreams);
  })
  .catch(function (err) {
      next(new Error(err));
    });
});

router.route('/').put(function(req, res, next) {
  var dreamId = req.body.id;
  knex("dreams")
  .where('id', dreamId)
  .update({
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    private: req.body.private,
    dream_image_url: req.body.dreamImg
  })
  .returning("*")
  .then(function (dreams) {
    res.json(dreams[0]);
  })
  .catch(function (err) {
      next(new Error(err));
    });
})

router.route('/upvote').post(function(req, res, next) {
  var dreamId = req.body.id;
  knex("dreams")
  .where('id', dreamId)
  .update({
    votes: req.body.votes + 1
  })
  .returning("*")
  .then(function (dreams) {
    res.json(dreams[0]);
  })
  .catch(function (err) {
      next(new Error(err));
    });
})

router.route('/downvote').post(function(req, res, next) {
  var dreamId = req.body.id;
  knex("dreams")
  .where('id', dreamId)
  .update({
    votes: req.body.votes - 1
  })
  .returning("*")
  .then(function (dreams) {
    res.json(dreams[0]);
  })
  .catch(function (err) {
      next(new Error(err));
    });
})


router.route("/").delete(function (req, res, next) {
  let dreamId = req.body.id;
  knex("dreams")
  .where("id", "=", dreamId)
  .del()
  .then(function (dream) {
    res.json(dream[0]);
  })
  .catch(function (err) {
      next(new Error(err));
    });
});


module.exports = router;
