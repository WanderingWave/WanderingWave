const db = require('../');

const Messages = db.Model.extend({
  tableName: 'messages'
});

module.exports = db.model('Messages', Messages);
