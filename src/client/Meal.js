import React from "react";
import { Link } from "react-router-dom";

function Meal({ meal }) {
  console.log(meal);
  return (
    <li className="Meal">
      <Link style={{textDecoration: 'none'}} to={`/meals/${meal.id}`}>
        <h3>{meal.title}</h3>
        <p>{meal.description}</p>
        <h4>{meal.location}</h4>
        <p>Price: {meal.price} Dkk</p>
      </Link>
    </li>
  );
}

export default Meal;
