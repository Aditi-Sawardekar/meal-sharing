import React from 'react'
import Meal from './Meal'

const MealsList = ({ meals }) => {
  
    const mealList = meals.map((meal) => (
      <Meal
        key={meal.id}
        meal={meal}        
      />
    ));
  
    return <ul className="MealsList">{meals.length ? mealList : <h2>No meals found!</h2>}</ul>;
  };

export default MealsList

