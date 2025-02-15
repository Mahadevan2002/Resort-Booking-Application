
import React from 'react'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import ExistingRoom from './components/room/ExistingRoom';
import { Navbar } from 'react-bootstrap';
import AddRoom from './components/room/AddRoom';
// import EditRoom from './components/room/EditRoom';
import Footer from './components/layout/Footer';
import NavBar from './components/layout/Navbar';
import RoomListing from './components/room/RoomListing';
import Admin from './components/admin/Admin';
import Login from './components/login/Login';
import CustomerService from './components/login/ContactForm';
import Checkout from './components/bookings/Checkout';
import BookingSuccess from './components/bookings/BookingSuccess';
import LogoutSuccessCard from './components/login/LogoutSuccessCard';
import Bookings from './components/bookings/Bookings';


function App() {

  return (
  <>
    <main>
        <Router>
           <NavBar/>
           <Routes>
              <Route path="/" element={<Home/>}/>
              {/* <Route path="/edit-room/:roomId" element={<EditRoom />} /> */}
              <Route path="/existing-rooms" element={<ExistingRoom/>}/>
              <Route path="/add-room" element={<AddRoom />} />
              <Route path="/book-room/:roomId" element={<Checkout/>} />
              <Route path="/browse-all-rooms" element={<RoomListing/>} />
              <Route path="/admin" element={<Admin/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/logout" element={<LogoutSuccessCard/>} />
              <Route path="/booking-success" element={<BookingSuccess/>} />
              <Route path="/customer-service" element={<CustomerService/>} />
              <Route path="/existing-bookings" element={<Bookings/>} />
           </Routes>
        </Router>
        <Footer/>
      </main>
 
   </>
  )
}

export default App
