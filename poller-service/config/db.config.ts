const HOST = "ask Dror";
const USER = "ask Dror";
const PASSWORD = "ask Dror";
const DB = "ask Dror";
const dialect = "postgres";
const pool = {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
};

export default {
    HOST,
    USER,
    PASSWORD,
    DB,
    dialect,
    pool
};