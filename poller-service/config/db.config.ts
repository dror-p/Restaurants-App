const HOST = "	trumpet.db.elephantsql.com";
const USER = "tcnqdocx";
const PASSWORD = "emo367LMybZni_Tu5a8c9vs1bo5CM_sH";
const DB = "tcnqdocx";
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