'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../../knex');
const bcrypt = require("bcrypt-as-promised");


router.route("/register").post(function (req, res, next) {
    bcrypt.hash(req.body.password, 3).then(function(hash){
        knex("users")
        .insert({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            hashed_password: hash
        })
        .returning(["first_name", "last_name", "email"])
        .then(function (userData) {
            res.json(userData)
        })
        .catch(function (err) {
            next(new Error(err));
        })
    })
});

router.route("/login").post(function (req, res, next) {
    var usersEmail = req.body.email;
        knex("users").where("email", usersEmail)
        .then(function(userInfo){
            var hashed = userInfo[0].hashed_password;
            bcrypt.compare(req.body.password, hashed).then(function(){

                delete userInfo[0].hashed_password;
                delete userInfo[0].created_at;
                delete userInfo[0].updated_at;
                res.json(userInfo);
            }).catch(bcrypt.MISMATCH_ERROR, function(){
                res.send("Sorry, but we couldn't find that username / password combination.");
            }).catch(function (err) {
                next(new Error(err));
            })
        })
        .catch(function (err) {
            next(new Error(err));
        })
});

router.route("/").patch(function (req, res, next) {
    var usersEmail = req.body.email;
    req.body.hashed_password = req.body.password;
    delete req.body.password;
    knex("users").where("email", usersEmail)
    .then(function(userInfo){
        var hashed = userInfo[0].hashed_password;
        bcrypt.compare(req.body.hashed_password, hashed).then(function(){
        })
        delete req.body.hashed_password;
        return knex('users').where('email', usersEmail).update(req.body).returning(['id', 'first_name', 'last_name', 'email'])
        }).then(function(updatedUser){
            delete updatedUser.hashed_password;
            delete updatedUser.created_at;
            delete updatedUser.updated_at;
            res.json(updatedUser);
        }).catch(bcrypt.MISMATCH_ERROR, function(){
            res.send("Sorry, but we couldn't find that username / password combination.");
        })

  .catch(function (err) {
      next(new Error(err));
    });
});

router.route("/").delete(function (req, res, next) {
  let usersEmail = req.body.email;
  knex("users").where("email", usersEmail)
  .then(function(userInfo){
      var hashed = userInfo[0].hashed_password;
      bcrypt.compare(req.body.password, hashed).then(function(){
        return knex('users').where('email', usersEmail).del()
      }).then(function(deletedUser){
          res.json(deletedUser)
      }).catch(bcrypt.MISMATCH_ERROR, function(){
          res.send("Sorry, but we couldn't find that username / password combination.");
      })
  })
  .catch(function (err) {
      next(new Error(err));
    });
});


module.exports = router;
