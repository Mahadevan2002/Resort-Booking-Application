import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {

  return (
  <div className="container ">
     <section classname="container mb-5">
    <h2>Welcome to AdminPanel</h2>
    <hr/>
    <Link to={"/existing-rooms"}> (👉ﾟヮﾟ)👉 Manage Rooms</Link> <br/><br/>
    <Link to={"/existing-bookings"}> (👉ﾟヮﾟ)👉 Manage Bookings</Link>
   </section>
  </div>
  )
}

export default Admin
