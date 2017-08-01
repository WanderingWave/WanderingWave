const db = require('../');
const Promise = require('bluebird');

const Notification = db.Model.extend({
  tableName: 'notifications',
  profile: function() {
    return this.belongsTo('Profile');
  }
});

module.exports = db.model('Notification', Notification);
