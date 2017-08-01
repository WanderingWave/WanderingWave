const models = require('../../db/models');
const knex = require('../../db').knex;


module.exports.getAll = (id) => {

  let rawSql = `SELECT p.first, p.last, n.type, n.status FROM notifications n JOIN profiles p ON p.id = n.sender WHERE n.recipient = ${id}`
  knex.raw(rawSql)
    .then(({ rows }) => {
      console.log('this is the raw sequel', rows)
    })

  //BOOKSHELF SYNTAX
  // models.Notification.where({ recipient: id }).fetchAll({ withRelated: ['profile'] })
  //   .then(result => {
  //     console.log('this is the result', result)
  //   })
  //   .catch(err => {
  //     console.log('error')
  //   });
}

module.exports.getAllUnread = (id) => {

  let rawSql = `SELECT p.first, p.last, n.type, n.status FROM notifications n JOIN profiles p ON p.id = n.sender WHERE n.recipient = ${id} AND status = 'unread'`
  knex.raw(rawSql)
    .then(({ rows }) => {
      console.log('this is the raw sequel', rows)
    })
}

module.exports.updateUnread = (id) => {

  let rawSql = `UPDATE notifications SET status = 'read' WHERE sender = ${id} AND status = 'unread'`
  knex.raw(rawSql)
    .then(({ rows }) => {
      console.log('this is the raw sequel', rows)
    })
}


// module.exports.getAll = (req, res) => {
//   models.Notifications.fetchAll()
//     .then(Notifications => {
//       res.status(200).send(Notifications);
//     })
//     .catch(err => {
//       // This code indicates an outside service (the database) did not respond in time
//       res.status(503).send(err);
//     });
// };

// module.exports.create = (req, res) => {
//   models.Notifications.forge({ message: req.body.message })
//     .save()
//     .then(result => {
//       console.log('this is the result of creating a message ', result);
//       res.status(201).send();
//     })
//     .catch(err => {
//       console.log('some error creating a message');
//       if (err.constraint === 'users_username_unique') {
//         return res.status(403);
//       }
//       res.status(500).send(err);
//     });
// };
