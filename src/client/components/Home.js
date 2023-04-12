import React from "react";
import Meal from "./Meal";
import {Link} from "react-router-dom"

const Home = ({ meals }) => {
  const mealList = meals.map((meal) => <Meal key={meal.id} meal={meal} />);

  return (
    <main className="Home">
      {meals.length ? (
        <>
          <h2>Home </h2>
          <p>
            Atithi Devo Bhava’ - the most famous saying means guests are like
            God and it is the spirit of the Indian tradition and culture when
            they welcome their guests. It truly reflects the rich and cultural
            heritage and warm hospitality of the people of India. With a
            civilization of more than five thousand years old, India is a
            country with an amazing wealth of diversity. India stretches from
            the eternal snows of the Himalayas in the north to the peninsulas of
            the south from the arid desert of the west to the humid deltas of
            the east from the dry heat and cold of the central plateau to the
            cool forest foothills and the golden beaches. Thus, it offers an
            incredible choice of destinations for a visiting tourist to relish
            and enjoy
          </p>
          {/*
          <p>
            India is proud of its geographical diversity. Where a northern state
            like Jammu and Kashmir is all Himalayan mountainous regions, the
            state of Rajasthan is all desert regions. The states of Kerala and
            Goa are coastal areas and Delhi, Punjab, Uttar Pradesh and many
            other states are all plains.
          </p>
          
          <p>
            India is also a land of diverse climatic conditions. The four
            seasons of summer, autumn, winter, and spring prevail throughout the
            year in most parts of the country. Places like Cherrapunji and
            Mawsynram receive maximum rainfall throughout the year. Then we have
            the Himalayan region in the north of the country, which serves as a
            border as well as a natural barrier to the bitterly cold Siberian
            winds. The coastal areas like Mumbai, Daman and Diu and Kolkata have
            tropical warm climates throughout.
          </p>
          
          <p>
            Diversity can also be observed in food habits and clothing. We have
            many cuisines like North Indian cuisine, a Mughlai cuisine, a South
            Indian cuisine, etc. Gujarati food is vegetarian whereas Bengali
            food mainly comprises of fish curries. People hailing from North
            India eat mainly wheat and those in the South are rice-consuming
            people.


            <Link to={"/meals"}>
              <button className="meals-button">Go to Meals</button>
            </Link>
          </p>
          */}

          <div>
            <Link to={"/meals"}>
              <button className="meals-button">Go to Meals</button>
            </Link>
          </div>
          
          <ul className="home-page-meals">{mealList.slice(0, 3)}</ul>
        </>
      ) : (
        <h2>No meals found!</h2>
      )}
    </main>
  );
};

export default Home;
