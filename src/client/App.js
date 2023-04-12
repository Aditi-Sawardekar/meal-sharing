import React, { useState, useEffect } from "react";
//import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import TestComponent from "./components/TestComponent/TestComponent";
import Header from "./Header";
import MealsList from "./MealsList";

function App() {
  // State while initial fetch
  const [meals, setMeals] = useState([]);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch("api/meals");

        if (!response.ok) {
          throw Error("Data not recieved. Something went wrong!");
        }

        const menuItems = await response.json();

        setMeals(menuItems);
        setError(null);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setIsLoading(false);

      }
    };
    (async () => await fetchMeals())();
  }, []);

  return (
    <div>
      <Header title="Meal Sharing" />

      <>
        {isLoading && <p>Loading...</p>}
        {error && <p>{`${error}`}</p>}
        {!isLoading && !error && <MealsList meals={meals} />}{" "}
      </>
    </div>

    /* Already in file, commented and saved if required in future
    <Router>
      <Route exact path="/">
        <p>testing React </p>
      </Route>
      <Route exact path="/lol">
        <p>lol</p>
      </Route>
      <Route exact path="/test-component">
        <TestComponent></TestComponent>
      </Route>
    </Router>
  */

  );
}

export default App;
