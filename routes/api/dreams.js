'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../../knex');

router.route('/').get(function(req, res, next){
    knex('dreams')
    .orderBy('id').then(function(dreams){
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
  knex('dreams')
  .insert({
    name: req.body.name,
    description: req.body.description,
    dream_image_url: req.body.imageURL,
    user_id: req.body.user_id
  })
  .returning(["*"])
  .then(function (dreams) {
    res.json(dreams[0]);
  })
  .catch(function (err) {
      next(new Error(err));
    });
});


router.route("/:id").delete(function (req, res, next) {
  let dreamId = Number(req.params.id);
  knex("dreams")
  .where("id", "=", dreamId)
  .del()
  .returning(["name"])
  .then(function (dream) {
    res.json(dream[0]);
  })
  .catch(function (err) {
      next(new Error(err));
    });
});


module.exports = router;
