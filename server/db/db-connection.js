const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");
const pgp = require("pg-promise")(/* options */);
// const db = pgp("postgres://username:password@host:5432/eventonica");
// const db = pgp("postgres://localhost:5432/eventonica");

function initDb() {
  load_dotenv_if_exists();
  let connection;

  if (process.env.DATABASE_URL === undefined) {
    console.log("Using Username and password for database");
    connection = {
      user: "postgres",
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      port: 5442,
    };
  } else {
    console.log("Using DATABASE_URL");
    connection = {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    };
  }
  console.log(connection);
  return pgp(connection);
}

load_dotenv_if_exists = () => {
  const DOTENV_FILE = path.join(__dirname, "../../.env");
  if (fs.existsSync(DOTENV_FILE)) {
    dotenv.config({ path: DOTENV_FILE });
  }
};

const db = initDb();

module.exports = db;
