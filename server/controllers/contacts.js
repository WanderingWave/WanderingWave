const models = require('../../db/models');
const knex = require('../../db').knex;

module.exports.addContact = (senderId, recipientId) => {

  let rawSql = `INSERT INTO contacts (sender, recipient) VALUES (${senderId}, ${recipientId})`
  knex.raw(rawSql)
    .then(({ rows }) => {
      console.log('this is the raw sequel', rows)
    })

}

module.exports.getContacts = (id) => {

  let rowsSender = null
  let rawSql = `SELECT p.first, p.last FROM contacts c JOIN profiles p ON p.id = c.recipient WHERE c.sender = ${id}`

  knex.raw(rawSql)
    .then(({ rows }) => {
      rowsSender = rows
      rawSql = `SELECT p.first, p.last FROM contacts c JOIN profiles p ON p.id = c.sender WHERE c.recipient = ${id}`
      return knex.raw(rawSql)
    })
    .then(({rows}) => {
      console.log(rows.concat(rowsSender));
    })
}

module.exports.getContacts(1)
