var express = require("express");
var router = express.Router();

var db = require("../db/db-connection.js");

/* GET users listing. */

router.get("/", async function (req, res, next) {
  const users = await db.any("SELECT * FROM users", [true]);
  try {
    res.send(users);
  } catch (e) {
    console.error("error when running db query", e);
    res.status(500).statusMessage("DB threw error");
  }
});

/* Add users listing. */
router.post("/", async (req, res) => {
  const user = {
    name: req.body.name,
    email: req.body.email,
    id: req.body.id,
  };
  try {
    const createdUser = await db.one(
      "INSERT INTO users(name, email, id) VALUES($1, $2, $3) RETURNING *",
      [user.name, user.email, user.id]
    );
    console.log(createdUser);
    res.send(createdUser);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

/* Delete users listing. */

//Parameterized queries use placeholders instead of directly writing the
//values into the statements. Parameterized queries increase security and performance.
router.delete("/:id", async (req, res) => {
  // : acts as a placeholder

  const userId = req.params.id;
  try {
    await db.none("DELETE FROM users WHERE id=$1", [userId]);
    res.send({ status: "success" });
  } catch (e) {
    return res.status(400).json({ e });
  }
});

module.exports = router;
