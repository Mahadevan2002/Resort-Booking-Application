package com.devaworks.DevaRessort.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devaworks.DevaRessort.model.BookedRoom;




public interface BookingRepository extends JpaRepository<BookedRoom, Long> {

	List<BookedRoom> findByRoomId(Long roomId);

	BookedRoom findByBookingConfirmationCode(String confirmationCode); 

}
