import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";

import TestComponent from "./components/TestComponent/TestComponent";

// Components fixed on Browser
import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

// Components that change
import Home from "./components/Home";
import MealsList from "./components/MealsList";
import MealCard from "./components/MealCard";
import NewReservation from "./components/NewReservation";
import NotFound from "./components/NotFound";
import About from "./components/About";
import ReviewMeal from "./components/ReviewMeal";

function App() {
  // State while initial fetch
  const [meals, setMeals] = useState([]);
  
  //Search in Nav
  const [search, setSearch] = useState("");
  const [searchMeal, setSearchMeal] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch("api/meals");
        const menuItems = await response.json();

        setMeals(menuItems);
      } catch (error) {
        console.log(error);
      }
    };
    (async () => await fetchMeals())();
  }, []);

  // Search Meal:
  /* Dependencies: meals and search - 
      - If meals are added the data to filter will change.
      - Then when we type to search, it should match with the data.  
  */

  useEffect(() => {
    const searchedMeal = meals.filter(
      (meal) => meal.title.toLowerCase().includes(search.toLowerCase())
      // || ((meal.description).toLowerCase()).includes(search.toLowerCase())
    );
    console.log(searchedMeal);
    setSearchMeal(searchedMeal);
  }, [meals, search]);

   return (
    <Router>
      <Header title="Atithi" />
      <Nav search={search} setSearch={setSearch} />

      <Switch>
        <Route exact path="/">
          <Home meals={meals}
           />
        </Route>
        <Route exact path="/meals">
          <MealsList 
          meals={searchMeal}/>
        </Route>
        <Route exact path="/meals/:id">
          <MealCard meals={meals} />
        </Route>
        <Route path="/about" component={About} />

        {/*Created reservation form */}
        <Route exact path="/meals/:id/reservation">
          <NewReservation />
        </Route>

        {/* To add Review to a Meal*/}
        <Route exact path="/meals/:id/review">
          <ReviewMeal />
        </Route>

        <Route exact path="/test-component">
          <TestComponent></TestComponent>
        </Route>

        <Route path="*" component={NotFound} />
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
