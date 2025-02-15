package com.devaworks.DevaRessort.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.devaworks.DevaRessort.model.Room;
import org.springframework.data.jpa.repository.Query;


import java.time.LocalDate;
import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {
    
	 @Query("SELECT DISTINCT r.roomType FROM Room r")
	List<String> findDistinctRoomTypes();
	 

}
