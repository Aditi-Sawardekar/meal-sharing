const express = require("express");
const router = express.Router();
const knex = require("../database");

// /api/meals - GET - Returns all meals
router.get("/", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const meals = await knex("meal").select("*");
    if (!meals) {
      return response.status(404)
    } else {
      response.json(meals);
    }
  } catch (error) {
    throw error;
  }
});

// /api/meals - POST - Adds a new meal to the database
router.post("/", async (request, response) => {
  try {
    const meal = request.body;
    await knex("meal").insert(meal);

    if (!meal) {
      return response.status(404)
    } else {
      response.json(meal);
    }
  } catch (error) {
    return response.status(400).send(error?.sqlMessage);
  }
});

// /api/meals/:id - GET - 	Returns the meal by id
router.get("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const meal = await knex("meal").select("*").where({ id: id });
    if (!meal) {
      return response.status(404)
    } else {
      response.json(meal);
    }
  } catch (error) {
    throw error;
  }
});

// /api/meals/:id - PUT - 	Updates the meal by id
router.put("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const changes = request.body;
    const meal = await knex("meal").where({ id: id }).update(changes);
    if (!meal) {
      return response.status(404)
    } else {
      response.json(changes);
    }
  } catch (error) {
    return response.status(400).send(error?.sqlMessage);
    // res.status(500).json({message: "Error updating new post", error: err}
  }
});

// /api/meals/:id - DELETE - 	Deletes the meal by id
router.delete("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const meal = await knex("meal").where({ id: id }).delete();
    if (!meal) {
      return response.status(404)
    } else {
      response.send({ "message": "Deleted meal" });
    }
  } catch (error) {
    throw error;
    // res.status(500).json({message: "Error updating new post", error: err}
  }
});

module.exports = router;
