exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('notifications', function(table) {
      table.increments('id').unsigned().primary();
      table.integer('sender').references('profiles.id').onDelete('CASCADE');
      table.integer('recipient').references('profiles.id').onDelete('CASCADE');
      table.string('type', 100).nullable();
      table.string('status', 100).nullable();
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('notifications'),
  ]);
};
