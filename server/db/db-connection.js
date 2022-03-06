const pgp = require("pg-promise")(/* options */);
// const db = pgp("postgres://username:password@host:5432/eventonica");
const db = pgp("postgres://localhost:5432/eventonica");

module.exports = db;
