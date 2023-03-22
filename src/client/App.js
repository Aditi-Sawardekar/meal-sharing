import React, { useState, useEffect } from "react";
//import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import TestComponent from "./components/TestComponent/TestComponent";
import Header from "./Header";

function App() {
  // State while initial fetch
  const[meals, setMeals]=useState([])
  
  useEffect(()=>{
    const fetchMeals = async ()=>{
      try{
        const response = await fetch("api/meals");
        console.log(response)
      }catch(error){

      }
    }
    fetchMeals();
  })
  

  return (
    <Header title="Meal Sharing"/>
/*
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
