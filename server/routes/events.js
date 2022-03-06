var express = require("express");
var router = express.Router();

var db = require("../db/db-connection.js");

/* GET users listing. */

router.get("/", async function (req, res, next) {
  const events = await db.any("SELECT * FROM events");
  try {
    res.send(events);
  } catch (e) {
    console.error("error when running db query", e);
    res.status(500).statusMessage("DB threw error");
  }
});

/* Add events listing. */
router.post("/", async (req, res) => {
  const event = {
    id: req.body.id,
    name: req.body.name,
    date: req.body.date,
    category: req.body.category,
    description: req.body.description,
  };
  const query =
    "INSERT INTO events(name, date, category, description) VALUES($1, $2, $3, $4) RETURNING *";
  const values = [event.name, event.date, event.category, event.description];
  try {
    const createdEvent = await db.one(query, values);
    console.log(createdEvent);
    res.send(createdEvent);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

/* Delete events listing. */

//Parameterized queries use placeholders instead of directly writing the
//values into the statements. Parameterized queries increase security and performance.
router.delete("/:id", async (req, res) => {
  // : acts as a placeholder

  const eventId = req.params.id;
  try {
    await db.none("DELETE FROM events WHERE id=$1", [eventId]);
    res.send({ status: "success" });
  } catch (e) {
    return res.status(400).json({ e });
  }
});

module.exports = router;
