import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { format } from "date-fns";

const ReviewMeal = () => {
  const { id } = useParams();

  const [reviews, setReviews] = useState([]);
  const [mealId, setMealId] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewDescription, setReviewDescription] = useState("");
  const [reviewStars, setReviewStars] = useState("");

  // To fetch all Reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("api/reviews");
        const reviewItems = await response.json();

        setReviews(reviewItems);
      } catch (error) {
        console.log(error);
      }
    };
    (async () => await fetchReviews())();
  }, []);

  const handleReviewMeal = async (e) => {
    e.preventDefault();
    console.log("Review a Meal");
    const id = reviews.length ? reviews[reviews.length - 1].id + 1 : 1;

    const createdDate = format(new Date(), "yyyy-MM-dd");

    const body = {
      id: id,
      title: reviewTitle,
      description: reviewDescription,
      meal_id: mealId,
      stars: reviewStars,
      created_date: createdDate,
    };

    try {
      const response = await fetch("api/reviews/", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      
      const newReview = await response.json();
      
      // Add to Reservations
      const allReviews = [...reviews, body];
      setReviews(allReviews);

      // Set all values to blank
      setReviewTitle("");
      setReviewDescription("");
      setMealId("");
      setReviewStars("");

      history.push("/meals");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="ReviewMeal">
      <h2>Add Review</h2>
      <form className="review-meal-form" onSubmit={handleReviewMeal}>
        <div className="meal-id">
          <label htmlFor="MealId">Meal Id: </label>
          <input
            type="text"
            readOnly
            value={mealId}
            onClick={(e) => setMealId(id)}
          />
        </div>

        <div className="review-title">
          <label htmlFor="reviewTitle">Title: </label>
          <input
            id="reviewTitle"
            type="text"
            placeholder="Review Title"
            required
            value={reviewTitle}
            onChange={(e) => setReviewTitle(e.target.value)}
          />
        </div>

        <div className="review-description">
          <label htmlFor="reviewDescription">Description: </label>
          <textarea
            id="reviewDescription"
            type="text"
            placeholder="Review Description"
            required
            value={reviewDescription}
            onChange={(e) => setReviewDescription(e.target.value)}
          />
        </div>

        <div className="number-of-stars">
          <label htmlFor="number-of-stars">Stars: </label>
          <input
            id="number-of-stars"
            type="number"
            value={reviewStars}
            min={1}
            max={5}
            onChange={(e) => setReviewStars(e.target.value)}
          />
        </div>

        <button className="review-meal-button" type="submit">
          Submit Review
        </button>
      </form>
    </main>
  );
};

export default ReviewMeal;
