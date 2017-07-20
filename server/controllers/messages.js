const models = require('../../db/models');

module.exports.create = (req, res) => {
  console.log('MODELS', models)
  console.log('MESSAGES', models.Message)
  console.log(typeof req.body.firstName)
  models.Message.forge({ name: req.body.firstName })
    .save()
    .then(result => {
      console.log('success')
      res.status(201).send(result.omit('password'));
    })
    .catch(err => {
      console.log('error')
      if (err.constraint === 'users_username_unique') {
        return res.status(403);
      }
      res.status(500).send(err);
    });
};


// /WanderingWave/server/controllers/messages.j