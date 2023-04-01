const express = require("express");
const router = express.Router();
const knex = require("../database");

// meal title - http://localhost:3000/api/meals
router.get("/", async (request, response) => {
  try {
    let query = knex("meal");

    // knex syntax for selecting things. Look up the documentation for knex for further info
    // api/meals?maxPrice=90
    if ("maxPrice" in request.query) {
      const maxPrice = parseInt(request.query.maxPrice);
      if (!isNaN(maxPrice)) query = query.where("price", "<", maxPrice);
      else {
        return response.status(404).send(`please provide maxprice of the meal`);
      }
    }

    // api/meals?title=Indian%20platter
    if ("title" in request.query) {
      const title = request.query.title;
      query = query.where("title", "like", `%${title}%`);
    }

    // api/meals?dateAfter=2022-10-01
    if ("dateAfter" in request.query) {
      const dateAfter = new Date(request.query.dateAfter);
      if (dateAfter != "Invalid Date") {
        query = query.where("when", ">", dateAfter);
      } else {
        return response
          .status(404)
          .send(`please provide valid dateAfter Field in the query`);
      }
    }

    // api/meals?dateBefore=2022-08-08
    if ("dateBefore" in request.query) {
      const dateBefore = new Date(request.query.dateBefore);
      if (dateBefore && dateBefore != "Invalid Date") {
        query = query.where("meal_date_time", "<", dateBefore);
      } else {
        return response
          .status(404)
          .send(`please provide valid dateBefore Field in the query`);
      }
    }

    // api/meals?limit=7
    if ("limit" in request.query) {
      const limit = parseInt(request.query.limit);
      if (!isNaN(limit)) {
        query = query.limit(limit);
      } else {
        return response
          .status(404)
          .send(`please provide valid limit value  in the query`);
      }
    }

    // api/meals?sortKey=price
    if ("sortKey" in request.query) {
      const orderBy = request.query.sortKey.toString().trim();
      if (
        orderBy === "price" ||
        orderBy === "when" ||
        orderBy === "max_reservations"
      ) {
        if ("sortDir" in request.query) {
          let sortOrder = request.query.sortDir.toString().trim().toUpperCase();
          query = query.orderBy(orderBy, sortOrder);
        } else {
          query = query.orderBy(orderBy);
        }
      } else {
        response.send(`Invalid sort key`);
      }
    }

    // api/meals?availableReservations=true
    if (request.query.availableReservations === "true") {
      query = query
        .select(
          "meal.title",
          "meal.id",
          knex.raw(
            "(meal.max_reservations -  sum(reservation.number_of_guests)) as available_slot"
          )
        )
        .join("reservation", "meal.id", "=", "reservation.meal_id")
        .groupBy("reservation.meal_id")
        .having("available_slot", ">", "0");
    }

    const data = await query;
    data.length
      ? response.status(200).json(data)
      : response.send(`No meal Found`);
  } catch (e) {
    response.status(500).send(e.message);
  }
});

// /api/meals - POST - Adds a new meal to the database
router.post("/", async (request, response) => {
  try {
    const meal = request.body;
    await knex("meal").insert(meal);

    if (!meal) {
      return response.status(404);
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
      return response.status(404).send(`No meal found with Id:${id}`);
    } else {
      response.status(200).json(meal);
    }
  } catch (error) {
    response.status(503).send(`${error.message}`);
  }
});

// /api/meals/:id - PUT - 	Updates the meal by id
router.put("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const changes = request.body;
    const meal = await knex("meal").where({ id: id }).update(changes);
    if (!meal) {
      return response.status(404).send(`No meal found with Id:${id}`);
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
      return response.status(404).send(`No meal found with Id:${id}`);
    } else {
      response.send({ message: "Deleted meal" });
    }
  } catch (error) {
    response.status(503).send(`Couldn't Delete`)
  }
});

module.exports = router;

/* GET api/meals
1.Parameter: maxPrice
  DataType: Number
  Description:  Returns all meals that are cheaper than maxPrice.
  Example: api/meals?maxPrice=90

2.Parameter: availableReservations
  DataType: Boolean
  Description:  Returns all meals that still have available spots left, if true. If false, return meals that have no available spots left.
  Example: api/meals?availableReservations=true

3.Parameter: title
  DataType: String
  Description:  Returns all meals that partially match the given title. Rød grød will match the meal with the title Rød grød med fløde.
  Example: api/meals?title=Indian%20platter  

4.Parameter: dateAfter
  DataType: Date
  Description:  Returns all meals where the date for when is after the given date.
  Example: api/meals?dateAfter=2022-10-01  

5.Parameter: dateBefore
  DataType: Date
  Description:  Returns all meals where the date for when is before the given date.
  Example: api/meals?dateBefore=2022-08-08   

6.Parameter: limit
  DataType: Number
  Description:  Returns the given number of meals.	
  Example: api/meals?limit=7

7.Parameter: sortKey
  DataType: String
  Description:  Returns all meals sorted by the given key. Allows when, max_reservations and price as keys. Default sorting order is asc(ending).	
  Example: api/meals?sortKey=price

8.Parameter: sortDir
  DataType: String
  Description:  Returns all meals sorted in the given direction. Only works combined with the sortKey and allows asc or desc.
  Example: api/meals?sortKey=price&sortDir=desc
*/
