exports.up = function(knex, Promise) {  
  return Promise.all([
    knex.schema.dropTableIfExists('images'),
    knex.schema.createTable('images', function(table){
        table.increments('img_id').primary();
        table.string('url');
        table.string('owner');
        table.string('title');
        table.dateTime('creation_date');
    }),
    knex.schema.dropTableIfExists('likes'),
    knex.schema.createTable('likes', function(table){
        //table.increments('like_id').primary();
        table.string('img_id');
        table.string('user');
        table.primary("img_id", "user");
    })
  ]);
};

exports.down = function(knex, Promise) {  
  return Promise.all([
    knex.schema.table('images', function(table){
        table.dropColumn('title');
    }),
    knex.schema.dropTableIfExists('likes')
  ]);
};