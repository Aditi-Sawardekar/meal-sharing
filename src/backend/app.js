const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");

const knex = require('./database');

const mealsRouter = require("./api/meals");
const buildPath = path.join(__dirname, "../../dist");
const port = process.env.PORT; // || 3000;
const cors = require("cors");

// For week4 no need to look into this!
// Serve the built client html
app.use(express.static(buildPath));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(cors());

router.use("/meals", mealsRouter);

//----------------------------------------------------------------------------------------------------------------------
// Respond with all meals in the future (relative to the when datetime) - /future-meals

mealsRouter.get('/future-meals', async (req, res) => {
  try {
    const [rows] = await knex.raw("SELECT meal.id, meal.title, meal.meal_date_time FROM `meal` WHERE `meal_date_time` >= CURDATE()")
    if ([rows]) {
      res.json({
        status: 'success',
        data: rows
      })
    } else {
      throw new Error('Something went wrong');
    }
    ;
  } catch (e) {
    // console.log(e);  // debug if needed    
    res.send({
      status: 'fail',
      message: 'Future Meals does not exist'
    });
  }
});
//----------------------------------------------------------------------------------------------------------------------
// /past-meals	Respond with all meals in the past (relative to the when datetime)
app.get('/past-meals', async (req, res) => {
  try {
    const [rows] = await knex.raw("SELECT meal.id, meal.title, meal.meal_date_time FROM `meal` WHERE `meal_date_time` <= CURDATE()")
    if ([rows]) {
      res.json({
        status: 'success',
        data: rows
      })
    } else {
      throw new Error('Something went wrong');
      //throw new Error(res.statusText)    
    }
  } catch (e) {
    // console.log(e);  // debug if needed    
    res.send({
      status: 'fail',
      message: 'Past Meals does not exist'
    });
  }
});

//----------------------------------------------------------------------------------------------------------------------

// /all-meals	Respond with all meals sorted by ID
app.get('/all-meals', async (req, res) => {
  try {
    const [rows] = await knex.raw("SELECT meal.id, meal.title FROM meal ORDER BY meal.id ASC;")
    if ([rows]) {
      res.json({
        status: 'success',
        data: rows
      })
    } else {
      throw new Error('Something went wrong');
    }
    ;
  } catch (e) {
    // console.log(e);  // debug if needed    
    res.send({
      status: 'fail',
      message: 'Meals does not exist'
    });
  }
});
//----------------------------------------------------------------------------------------------------------------------
// /first-meal	Respond with the first meal (meaning with the minimum id
app.get('/first-meal', async (req, res) => {
  try {
    const [rows] = await knex.raw("SELECT meal.id, meal.title FROM meal ORDER BY meal.id ASC LIMIT 1;")
    if ([rows]) {
      res.json({
        status: 'success',
        data: rows
      })
    } else {
      throw new Error('Something went wrong');
    }
    ;
  } catch (e) {
    // console.log(e);  // debug if needed    
    res.send({
      status: 'fail',
      message: 'Meal does not exist'
    });
  }
});
//----------------------------------------------------------------------------------------------------------------------
// /last-meal	Respond with the last meal (meaning with the maximum id)
app.get('/last-meal', async (req, res) => {
  try {
    const [rows] = await knex.raw("SELECT meal.id, meal.title FROM meal ORDER BY meal.id DESC LIMIT 1;")
    if ([rows]) {
      res.json({
        status: 'success',
        data: rows
      })
    } else {
      throw new Error('Something went wrong');
    }
    ;
  } catch (e) {
    // console.log(e);  // debug if needed    
    res.send({
      status: 'fail',
      message: 'Meal does not exist'
    });
  }
});
//----------------------------------------------------------------------------------------------------------------------
if (process.env.API_PATH) {
  app.use(process.env.API_PATH, router);
} else {
  throw "API_PATH is not set. Remember to set it in your .env file"
}

// for the frontend. Will first be covered in the react class
app.use("*", (req, res) => {
  res.sendFile(path.join(`${buildPath}/index.html`));
});

module.exports = app;
