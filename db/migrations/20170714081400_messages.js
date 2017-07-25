
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('messages', function (table) {
      table.increments('id').unsigned().primary();
      table.string('message', 100).nullable();
      table.timestamps(true, true);
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('messages');
};
