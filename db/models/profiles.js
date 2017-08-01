const db = require('../');

const Profile = db.Model.extend({
  tableName: 'profiles',
  auths: function() {
    return this.hasMany('Auth');
  },
  notification: function() {
    return this.hasMany('Notification')
  } 
});

module.exports = db.model('Profile', Profile);
