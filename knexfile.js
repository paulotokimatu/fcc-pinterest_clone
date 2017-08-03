module.exports = {
    development: {
        client: "mysql",
        connection: {
            host     : process.env.DB_HOST,
            user     : process.env.DB_USER,
            password : '',
            database : process.env.DB_NAME
        }
    },
    production: {
        client: "mysql",
        connection: {
            host     : process.env.DB_HOST,
            user     : process.env.DB_USER,
            password : process.env.DB_PASSWD,
            database : process.env.DB_NAME
        }
    }
};