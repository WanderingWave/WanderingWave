const db = require('../');

const Message = db.Model.extend({
  tableName: 'messages'
  // auths: function() {
  //   return this.hasMany('Auth');
  // }
});

module.exports = db.model('Message', Message);
