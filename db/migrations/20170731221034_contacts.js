exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('contacts', function(table) {
      table.increments('id').unsigned().primary();
      table.integer('sender').references('profiles.id').onDelete('CASCADE');
      table.integer('recipient').references('profiles.id').onDelete('CASCADE');
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('contacts'),
  ]);
};
