import React from 'react'
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className='Not-Found'>
        <h2>Page Not Found</h2>
        <p><Link to="/">Visit our Home Page</Link></p>
    </main>
  )
}

export default Home