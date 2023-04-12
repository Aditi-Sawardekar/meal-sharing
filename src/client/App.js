import React, { useState, useEffect } from "react";
//import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import TestComponent from "./components/TestComponent/TestComponent";
import Header from "./Header";
import MealsList from "./MealsList";


function App() {
  // State while initial fetch
  const [meals, setMeals] = useState([]);
  
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
    <div>
      <Header title="Meal Sharing" />
      <MealsList 
        meals={meals}
      />
    </div>    
  );
}

export default App;
