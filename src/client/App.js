import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";

import TestComponent from "./components/TestComponent/TestComponent";

// Components fixed on Browser
import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";

// Components that change
import Home from "./Home";
import MealsList from "./MealsList";
import MealCard from "./MealCard";
import NewReservation from "./NewReservation";
import NotFound from "./NotFound";
import About from "./About";
import ReviewMeal from "./ReviewMeal";

function App() {
  // State while initial fetch
  const [meals, setMeals] = useState([]);

  //Search in Nav
  const [search, setSearch] = useState("");
  const [searchedMeal, setSearchedMeal] = useState([]);

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

  return (
    <Router>
      <Header title="Meal Sharing" />
      <Nav search={search} setSearch={setSearch} />

      <Switch>
        <Route exact path="/">
          <Home meals={meals} />
        </Route>
        <Route exact path="/meals">
          <MealsList meals={meals} />
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
          <ReviewMeal />{" "}
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
