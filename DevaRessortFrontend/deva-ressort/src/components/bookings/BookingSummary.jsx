// 


import React, { useState, useEffect } from "react"
import moment from "moment"
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom"

const BookingSummary = ({ booking = {}, payment = 0, isFormValid, onConfirm }) => {
	const checkInDate = moment(booking.checkInDate)
	const checkOutDate = moment(booking.checkOutDate)
	const numberOfDays = checkOutDate.isAfter(checkInDate) ? checkOutDate.diff(checkInDate, "days") : 0

	const [isBookingConfirmed, setIsBookingConfirmed] = useState(false)
	const [isProcessingPayment, setIsProcessingPayment] = useState(false)
	const navigate = useNavigate()

	const handleConfirmBooking = () => {
		setIsProcessingPayment(true)
		setTimeout(() => {
			setIsProcessingPayment(false)
			setIsBookingConfirmed(true)
			onConfirm && onConfirm()
		}, 3000)
	}

	useEffect(() => {
		if (isBookingConfirmed) {
			navigate("/booking-success")
		}
	}, [isBookingConfirmed, navigate])

	return (
		<div className="row">
			<div className="col-md-6"></div>
			<div className="card card-body mt-5">
				<h4 className="card-title hotel-color">Reservation Summary</h4>
				<p>Name: <strong>{booking.guestFullName || "N/A"}</strong></p>
				<p>Email: <strong>{booking.guestEmail || "N/A"}</strong></p>
				<p>Check-in Date: <strong>{checkInDate.isValid() ? checkInDate.format("MMM Do YYYY") : "Invalid Date"}</strong></p>
				<p>Check-out Date: <strong>{checkOutDate.isValid() ? checkOutDate.format("MMM Do YYYY") : "Invalid Date"}</strong></p>
				<p>Number of Days Booked: <strong>{numberOfDays > 0 ? numberOfDays : "Invalid Booking Dates"}</strong></p>

				<div>
					<h5 className="hotel-color">Number of Guests</h5>
					<p><strong>Adults:</strong> {booking.numOfAdults }</p>
					<p><strong>Children:</strong> {booking.numOfChildren }</p>
				</div>

				{payment > 0 ? (
					<>
						<p>Total payment: <strong>₹{payment}</strong></p>

						{isFormValid && !isBookingConfirmed ? (
							<Button variant="success" onClick={handleConfirmBooking} disabled={isProcessingPayment}>
								{isProcessingPayment ? (
									<>
										<span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
										Processing Payment...
									</>
								) : (
									"Confirm Booking & Proceed to Payment"
								)}
							</Button>
						) : isBookingConfirmed ? (
							<div className="d-flex justify-content-center align-items-center">
								<div className="spinner-border text-primary" role="status">
									<span className="visually-hidden">Loading...</span>
								</div>
							</div>
						) : null}
					</>
				) : (
					<p className="text-danger">Check-out date must be after check-in date.</p>
				)}
			</div>
		</div>
	)
}

export default BookingSummary
