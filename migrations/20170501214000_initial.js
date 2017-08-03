exports.up = function(knex, Promise) {  
  return Promise.all([
    knex.schema.dropTableIfExists('users'),
    knex.schema.createTable('users', function(table){
        table.string('twitter_id').primary();
        table.string('name');
    })
  ]);
};

exports.down = function(knex, Promise) {  
  return Promise.all([
    knex.schema.dropTableIfExists('users'),
    knex.schema.dropTableIfExists('images'),
    knex.schema.dropTableIfExists('likes')
  ]);
};