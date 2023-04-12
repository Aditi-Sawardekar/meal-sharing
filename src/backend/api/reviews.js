const express = require("express");
const router = express.Router();
const knex = require("../database");

router.get("/", async (request, response) => {
    try {
        const review = await knex("review").select("*");
        if (!review) {
            return response.status(404)
        } else {
            response.status(200).send(review);
        }
    } catch (error) {
        response.status(503).send(`${error.message}`);
    }
});

router.post("/", async (request, response) => {
    try {
        const review = request.body;
        const insertReview = await knex("review").insert(review);

        if (!insertReview) {
            return response.status(404)
        } else {
            response.status(200).send(review);
        }
    } catch (error) {
        return response.status(400).send(error?.sqlMessage);
    }
});

router.get("/:id", async (request, response) => {

    try {
        const id = request.params.id;
        const review = await knex("review").select("*").where({ id: id });
        if (!review) {
            return response.status(404)
        } else {
            response.status(200).send(review);
        }
    } catch (error) {
        response.status(503).send(`${error.message}`);
    }
});

router.put("/:id", async (request, response) => {
    try {
        const id = request.params.id;
        const changes = request.body;
        const review = await knex("review").where({ id: id }).update(changes);
        if (!review) {
            return response.status(404)
        } else {
            response.json(changes)
        }
    } catch (error) {
        response.status(503).send(`${error.message}`);
    }
});

router.delete("/:id", async (request, response) => {
    try {    
        const id = request.params.id;    
        const review = await knex("review").where({ id: id }).delete();
        if (!review) {
            return response.status(404)
        } else {
            response.send({ "message": "Deleted review" });
        }
    } catch (error) {
        response.status(503).send(`${error.message}`);
        // res.status(500).json({message: "Error updating new post", error: err}
    }
});

module.exports = router;

/* GET /api/reviews - Returns all reviews.

1.Route: /api/meals/:meal_id/reviews
  Method: GET  
  Description: Returns all reviews for a specific meal.
  
2.Route: /api/reviews
  Method: POST     
  Description: Adds a new review to the database.

3.Route: /api/reviews/:id  
  Method: GET
  Description: Returns a review by id.  

4.Route: /api/reviews/:id  
  Method: PUT
  Description: Updates the review by id.

5.Route: /api/reviews/:id  
  Method: DELETE
  Description: Deletes the review by id.  

*/  