import React from "react";
import { Link } from "react-router-dom";

function Meal({ meal }) {
  console.log(meal);
  return (
    <li className="Meal">
      <Link style={{ textDecoration: "none" }} to={`/meals/${meal.id}`}>
        <img
          src={require(`../../../public/images/${meal.id}.jpg`).default}
          className="photo"
          alt=" "
        />
        <h4>{meal.title <= 24
            ? meal.description
            : `${meal.title.slice(0, 24)}...`
        
        }</h4>

        <h5>
          {meal.description.length <= 30
            ? meal.description
            : `${meal.description.slice(0, 30)}...`}
        </h5>
        <h5>{meal.location}</h5>
        <p>Price: {meal.price} Dkk</p>
      </Link>
    </li>
  );
}

export default Meal;
