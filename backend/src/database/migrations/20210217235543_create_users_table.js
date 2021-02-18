exports.up = function(knex) {
    return knex.schema.createTable('planets', function (table) {
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('climate').notNullable();
        table.string('ground').notNullable();
        table.int('showmovie').nullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('planets');
  };