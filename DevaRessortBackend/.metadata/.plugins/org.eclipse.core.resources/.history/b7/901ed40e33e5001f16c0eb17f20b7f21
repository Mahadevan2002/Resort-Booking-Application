package com.devaworks.DevaRessort.service;

import java.util.List;

import com.devaworks.DevaRessort.model.BookedRoom;

public interface IBookingService {

	List<BookedRoom> getAllBookingsByRoomId(Long roomId);

	List<BookedRoom> getAllBookings();

	BookedRoom findByBookingConfirmationCode(String confirmationCode);

	String saveBooking(Long roomId, BookedRoom bookingRequest);

	void cancelBooking(Long bookingId);

}
