package com.devaworks.DevaRessort.response;

import java.math.BigDecimal;
import java.util.List;

import org.apache.tomcat.util.codec.binary.Base64;

import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
public class RoomResponse {
	private Long id;
	
    private String roomType;
    
    private BigDecimal roomPrice;
    
    private boolean isBooked;
    
    private String photo;
    
    private List<BookingResponse>bookings;

	public RoomResponse(Long id, String roomType, BigDecimal roomPrice) {
		super();
		this.id = id;
		this.roomType = roomType;
		this.roomPrice = roomPrice;
	}

	public RoomResponse(Long id, String roomType, BigDecimal roomPrice, boolean isBooked, byte[] photoBytes) {
		super();
		this.id = id;
		this.roomType = roomType;
		this.roomPrice = roomPrice;
		this.isBooked = isBooked;
		 this.photo = photoBytes != null ? Base64.encodeBase64String(photoBytes) : null;
//		this.bookings = bookings;
	}

	public void setRoomType(String roomType) {
		this.roomType = roomType;
	}

	public void setRoomPrice(BigDecimal roomPrice) {
		this.roomPrice = roomPrice;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public boolean isBooked() {
		return isBooked;
	}

	public void setBooked(boolean isBooked) {
		this.isBooked = isBooked;
	}

	public List<BookingResponse> getBookings() {
		return bookings;
	}

	public void setBookings(List<BookingResponse> bookings) {
		this.bookings = bookings;
	}

	public String getRoomType() {
		return roomType;
	}

	public BigDecimal getRoomPrice() {
		return roomPrice;
	}

	public String getPhoto() {
		return photo;
	}

	
	
}
