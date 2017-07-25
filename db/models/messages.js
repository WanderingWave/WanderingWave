const db = require('../');

module.exports = db.model('Message', Message);
const Messages = db.Model.extend({
  tableName: 'messages'
});

module.exports = db.model('Messages', Messages);
