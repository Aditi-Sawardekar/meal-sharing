const express = require("express");
const router = express.Router();
const knex = require("../database");

// meal title - http://localhost:3000/api/meals
router.get("/", async (request, response) => {
  try {
    
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const titles = await knex("meal").select("title");
    response.json(titles);

    // Parameter - Max Price
    if ("maxPrice" in request.query){
      console.log ("Max Price");
      console.log (request.query.maxPrice);
    }



    
  } catch (error) {
    throw error;
  }
});

// ---------------------------------------------------------------------------------------------- //








// ---------------------------------------------------------------------------------------------- //
module.exports = router;
