const db = require('../');
const Promise = require('bluebird');

const Contact = db.Model.extend({
  tableName: 'contacts'
});

module.exports = db.model('Contact', Contact);
