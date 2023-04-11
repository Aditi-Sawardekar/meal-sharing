import React from "react";
import {Link} from "react-router-dom"

const Nav = ({ search, setSearch }) => {
  return (
    <nav className="Nav">
      <form className="searchBar" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search">Search Meals: </label>
        <input
          id="search"
          type="text"
          placeholder="Search Meals"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/meals">Meals</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;

/* A <Link> is an element that lets the user navigate to another page by clicking or tapping on it. In react-router-dom , a <Link> renders an accessible <a> element with a real href that 
points to the resource it's linking to.

This tells react router 
Dont request this link from server
Just route to the proper component
*/