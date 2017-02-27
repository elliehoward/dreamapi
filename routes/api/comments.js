'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../../knex');

router.route('/').get(function(req, res, next){
    knex('comments')
    .orderBy('id').then(function(comments){
        res.json(comments);
    }).catch(function(err){
        next(new Error(err));
    });
});

router.route('/:id').get(function(req, res, next){
    var dreamId =  Number(req.params.id);
    knex('comments').where('dream_id', dreamId)
    .then(function(specificDreamComments){
        res.json(specificDreamComments);
    }).catch(function(err){
        next(new Error(err));
    });
});

router.route("/").post(function (req, res, next) {
  knex('comments')
  .insert({
    content: req.body.content
    dream_id: req.body.dream_id
    user_id: req.body.user_id
  })
  .returning(["*"])
  .then(function (comments) {
    res.json(comments[0]);
  })
  .catch(function (err) {
      next(new Error(err));
    });
});


router.route("/:id").delete(function (req, res, next) {
  let commentId = Number(req.params.id);
  knex("comments")
  .where("id", "=", commentId)
  .del()
  .returning(["name"])
  .then(function (comment) {
    res.json(comment[0]);
  })
  .catch(function (err) {
      next(new Error(err));
    });
});


module.exports = router;
