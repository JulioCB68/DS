exports.up = function(knex) {
  return knex.schema.createTable('sales', function (table) {
    table.increments();

    table.string('name').notNullable();
    table.decimal('commands').notNullable();
    table.string('requests').notNullable();
    table.decimal('quantities').notNullable();
    table.decimal('value').notNullable();
    
    table.string('user_id').notNullable();

    table.foreign('user_id').references('id').inTable('users');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('sales');
};