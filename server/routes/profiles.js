'use strict';
const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers').Profiles;

router.route('/')

  .get(() => {


    // ProfileController.getOne(req, res)
  })


//   .get(ProfileController.getAll)
// // .post(ProfileController.create)
;

router.route('/:id')
  .get(() => {
    console.log('hello', req.params.id)
    // ProfileController.getOne(req, res)
  })
// .put(ProfileController.update)
// .delete(ProfileController.deleteOne)
;

module.exports = router;
