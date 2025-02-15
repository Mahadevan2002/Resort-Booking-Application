
import React, { useState, useEffect } from "react";
import { FaStar, FaUserCircle } from "react-icons/fa";
import Card from "../ui/Card";
import Button from "../ui/Button";
import "./ContactForm.css";
import HotelService from "../common/HotelService";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    enquiry: "",
    feedback: "",
    rating: 0,
  });
  const [reviews, setReviews] = useState(() => {
    return JSON.parse(localStorage.getItem("reviews")) || [];
  });

  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }, [reviews]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRating = (value) => {
    setFormData((prev) => ({ ...prev, rating: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.enquiry || !formData.feedback || formData.rating === 0) {
      alert("All fields are required, including rating!");
      return;
    }
    const newReview = {
      ...formData,
      id: Date.now(),
      date: new Date().toLocaleString(),
    };
    setReviews([newReview, ...reviews]);
    setFormData({ name: "", email: "", enquiry: "", feedback: "", rating: 0 });
  };

  const clearReviews = () => {
    localStorage.removeItem("reviews");
    setReviews([]);
  };

  return (
   <div>
   <div>
   <HotelService/>
   </div>
   <div>
   <div className="contact-form-container">
      <h2 className="contact-title">User Reviews & Feedback</h2>
      {reviews.map((review) => (
        <Card key={review.id} className="review-card">
          <div className="review-header">
            <FaUserCircle className="user-icon-xl" />
            <div>
              <h3 className="review-user-name">{review.name}</h3>
              <p className="review-date">{review.date}</p>
            </div>
          </div>
          <p className="user-email">{review.email}</p>
          <p><strong>Enquiry:</strong> {review.enquiry}</p>
          <p><strong>Feedback:</strong> {review.feedback}</p>
          <div className="contact-rating">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={i < review.rating ? "golden-star" : "inactive"} />
            ))}
          </div>
        </Card>
      ))}
      
      <hr />
      
      {/* <Button onClick={clearReviews} className="contact-button">Clear Reviews</Button> */}
      
      <Card className="contact-card">
        <h2 className="contact-title">Submit Your Review</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required className="contact-input" />
          <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required className="contact-input" />
          <textarea name="enquiry" placeholder="Any Enquiries..." value={formData.enquiry} onChange={handleChange} required className="contact-textarea"></textarea>
          <textarea name="feedback" placeholder="Share your feedback..." value={formData.feedback} onChange={handleChange} required className="contact-textarea"></textarea>
          <div className="contact-rating">
            <span>Rate us:</span>
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={formData.rating > i ? "golden-star" : "inactive"} onClick={() => handleRating(i + 1)} />
            ))}
          </div>
          <Button type="submit" className="contact-button">Submit</Button>
        </form>
      </Card>
    </div>

   </div>
   </div>
     );
};

export default ContactForm;
