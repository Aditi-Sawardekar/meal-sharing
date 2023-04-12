import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { format } from "date-fns";

const NewReservation = ({}) => {
  const { id } = useParams();

  const [reservations, setReservations] = useState([]);
  const [contactName, setContactName] = useState("");
  const [contactPhonenumber, setContactPhoneNumber] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState("");
  const [mealId, setMealId] = useState("");

  // To fetch all Reservations
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch("api/reservations");
        const reservationItems = await response.json();

        setReservations(reservationItems);
      } catch (error) {
        console.log(error);
      }
    };
    (async () => await fetchReservations())();
  }, []);

  const handleReserveMeal = async () => {
    console.log("Book the Meal");
    const id = reservations.length
      ? reservations[reservations.length - 1].id + 1
      : 1;

    //const createdDate = new Date().toString().slice(0, 25);
    const createdDate = format(new Date(), "yyyy-MM-dd");

    const body = {
      id: id,
      number_of_guests: numberOfGuests,
      meal_id: mealId,
      created_date: createdDate,
      contact_phonenumber: contactPhonenumber,
      contact_name: contactName,
      contact_email: contactEmail,
    };

    try {
      const response = await fetch("api/reservations/", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const newReservation = await response.json();

      // Add to Reservations
      const allReservations = [...reservations, body];
      setReservations(allReservations);

      // Set all values to blank
      setNumberOfGuests("");
      setMealId("");
      setContactPhoneNumber("");
      setContactName("");
      setContactEmail("");

      let history = useHistory();
      history.go("/meals");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="NewReservation">
      <h2>New Reservation</h2>
      <form className="new-reservation-form" onSubmit={handleReserveMeal}>
        <div className="meal-id">
          <label htmlFor="MealId">Meal Id: </label>
          <input
            type="text"
            readOnly
            value={mealId}
            onClick={(e) => setMealId(id)}
          />
        </div>

        <div className="number-of-guests">
          <label htmlFor="number-of-guests">Guests: </label>
          <input
            id="number-of-guests"
            type="number"
            value={numberOfGuests}
            min={1}
            max={5}
            onChange={(e) => setNumberOfGuests(e.target.value)}
          />
        </div>

        <div className="contact-name">
          <label htmlFor="name">Name: </label>
          <input
            id="name"
            type="text"
            placeholder="Name"
            required
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
          />
        </div>

        <div className="email">
          <label htmlFor="email">Email: * </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="email-id"
            required
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
          />
        </div>

        <div className="phone">
          <label htmlFor="phone">Phone: </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            placeholder="+45 1234 5678"
            value={contactPhonenumber}
            onChange={(e) => setContactPhoneNumber(e.target.value)}
          />
        </div>

        <button className="reserveMealButton" type="submit">
          Book
        </button>
      </form>
    </main>
  );
};

export default NewReservation;

