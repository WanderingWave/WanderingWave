'use strict';
const router = require('express').Router();
const MessagesController = require('../controllers').Messages;

router.route('/')
  .get(MessagesController.getAll)
  .post(MessagesController.create);


  // .post(ProfileController.create)

// router.route('/:id')
//   .get(ProfileController.getOne)
//   // .put(ProfileController.update)
//   // .delete(ProfileController.deleteOne)
//   ;

module.exports = router;
