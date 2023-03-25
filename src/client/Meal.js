import React from "react";

function Meal({ meal }) {
  console.log(meal);
  return (
    <li>
      <h3>{meal.title}</h3>
      <p>{meal.description}</p>
      <h4>{meal.location}</h4>
      <p>Price: {meal.price} Dkk</p>
    </li>
  );
}

export default Meal;
