exports.up = function(knex, Promise) {  
  return Promise.all([
    knex.schema.dropTableIfExists('likes'),
    knex.schema.createTable('likes', function(table){
        //table.increments('like_id').primary();
        table.string('img_id');
        table.string('user');
        table.primary(["img_id", "user"]);
    })
  ]);
};

exports.down = function(knex, Promise) {  
  return Promise.all([
    knex.schema.dropTableIfExists('likes')
  ]);
};