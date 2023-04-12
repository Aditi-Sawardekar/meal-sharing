import React from "react";
import Meal from "./Meal";

const Home = ({ meals }) => {
  
  const mealList = meals.map((meal) => <Meal key={meal.id} meal={meal} />);
  
  return (
    <main className="Home">
      {meals.length ? (
        <>
          <h2>Home</h2>
          <p>This is a meal sharing App</p>
          <ul>{mealList.slice(0, 3)}</ul>
        </>
      ) : (
        <h2>No meals found!</h2>
      )}
    </main>
  );
};

export default Home;
