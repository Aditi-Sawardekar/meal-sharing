// To display details of each meal 
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const MealCard = ({ meals }) => {  
  const { id } = useParams(); 

  const meal = meals.find((meal) => meal.id.toString() === id);
  console.log({ id });

  const [availableReservations, setAvailableReservations] = useState("0");

  useEffect(() => {
    const fetchMealReservation = async () => {
      try {
        const response = await fetch("api/meals?availableReservations=true");
        const reservationData = await response.json();
        
        const filteredMeal = reservationData.filter((meal) => {
          return meal.id == id;
        });

        const availableSlots = filteredMeal[0]["Available_slot"];        
        setAvailableReservations(availableSlots);   

      } catch (error) {
        console.log(error);
      }
    };
    (async () => await fetchMealReservation())();
  }, []);   

  return (
    <main className="MealCard">
      <h2>MealCard</h2>
      <article className="MealCardArticle">
        {meal && (
          <>
            <h2>{meal.title}</h2>
            <h5>{meal.id}</h5>
            <p>Add More details to the menu card</p>
            <Link to={`/meals/${id}/review`} >
                <button className="review-meal-button">Review Meal</button>
              </Link>  
            <h3>{`Available Reservations: ${availableReservations}`}</h3>
            {availableReservations > 0 ? (
              <Link to={`/meals/${id}/reservation`} >
                <button className="reserve-meal-button">Book Meal</button>
              </Link>
            ) : (
              <>
                <h3>Reservation is Full</h3>
                <Link to="/meals">Visit our Meals Page</Link>
              </>
            )}
          </>
        )}
        {!meal && (
          <>
            <h2>Meal Not Found!</h2>
            <Link to="/meals">Visit our Meals Page</Link>
          </>
        )}
      </article>
    </main>
  );
};

export default MealCard;

/*
-Display the details of an individual Meal.
-If Available slots greater than 0; show Book Meal Button
  Else... -Give Link to go to Meals Page
-When the Book button is clicked -> We will book the Meal.
  - Open New Reservation Page
-If id does not match...
  -Message: Meal not Found
  -Give Link to go to Meals Page
  */


