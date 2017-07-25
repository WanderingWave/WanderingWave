const models = require('../../db/models');

module.exports.getAll = (req, res) => {
  models.Messages.fetchAll()
    .then(messages => {
      res.status(200).send(messages);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

module.exports.create = (req, res) => {
  models.Messages.forge({ message: req.body.message})
    .save()
    .then(result => {
      console.log('this is the result of creating a message ', result);
      res.status(201).send();
    })
    .catch(err => {
      console.log('some error creating a message');
      if (err.constraint === 'users_username_unique') {
        return res.status(403);
      }
      res.status(500).send(err);
    });
};
