const express = require("express");
const router = express.Router();
const knex = require("../database");

/* TESTING 
router.get("/", async (request, response) => {
    response.send("Reservations")
})
*/

// /api/reservations - GET - Returns all reservations
router.get("/", async (request, response) => {
  try {
    const reservations = await knex("reservation").select("*");
    if (!reservations) {
      return response.status(404);
    } else {
      response.json(reservations);
    }
  } catch (error) {
    response.status(503).send(`${error.message}`);
  }
});

// /api/reservations - POST - Adds a new reservation to the database
router.post("/", async (request, response) => {
  try {
    const reservation = request.body;
    const insertReservation = await knex("reservation").insert(reservation);

    if (!insertReservation) {
      return response.status(404);
    } else {
      response.json(reservation);
    }
  } catch (error) {
    return response.status(400).send(error?.sqlMessage);
  }
});

// /api/reservations/:id - GET - 	Returns a reservation by id
router.get("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const reservation = await knex("reservation").select("*").where({ id: id });
    if (!reservation) {
      return response.status(404);
    } else {
      response.json(reservation);
    }
  } catch (error) {
    response.status(503).send(`${error.message}`);
  }
});

// /api/reservations/:id - PUT - 	Updates the reservation by id
router.put("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const changes = request.body;
    const reservation = await knex("reservation")
      .where({ id: id })
      .update(changes);
    if (!reservation) {
      return response.status(404);
    } else {
      response.json(changes);
    }
  } catch (error) {
    response.status(503).send(`${error.message}`);
  }
});

// /api/reservations/:id - DELETE - 	Deletes the reservation by id
router.delete("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const reservation = await knex("reservation").where({ id: id }).delete();
    if (!reservation) {
      return response.status(404);
    } else {
      response.send({ message: "Deleted reservation" });
    }
  } catch (error) {
    response.status(503).send(`${error.message}`);
    // res.status(500).json({message: "Error updating new post", error: err}
  }
});

module.exports = router;
