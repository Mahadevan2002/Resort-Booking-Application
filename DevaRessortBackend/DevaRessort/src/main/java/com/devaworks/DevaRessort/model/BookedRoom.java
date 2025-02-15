package com.devaworks.DevaRessort.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "booked_room")
public class BookedRoom {
	@Id
	@GeneratedValue(strategy =GenerationType.IDENTITY)
   private Long bookingId;
	
	@Column(name ="adults")
	   private int NumofAdults;
	
	@Column(name ="children")
	   private int NumofChildren;
	

	@Column(name ="confirmatiuon_Code")
   private String  bookingConfirmationCode;
   
	@Column(name ="check_In")
   private LocalDate checkInDate;
	
	@Column(name ="check_Out")
	private LocalDate checkOutDate;
	

	@Column(name ="Guest_Email")
   private String guestEmail;
   
	@Column(name ="Guest_FullName")
   private String guestFullName;
   
   
	@Column(name ="total_guest")
   private int totalNumofGuest;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="room_id")
   private Room room;
   
   
   public void setRoom(Room room) {
		this.room = room;
	}

   public void calculatestotalNumberofGuest() {
	     this.totalNumofGuest = this.NumofAdults + NumofChildren;      
      }
   
   public void setNumofAdults(int numofAdults) {
		this.NumofAdults = numofAdults;
	calculatestotalNumberofGuest();

	}


	public void setNumofChildren(int numofChildren) {
		this.NumofChildren = numofChildren;
		calculatestotalNumberofGuest();
	}

	public void setBookingConfirmationCode(String bookingConfirmationCode) {
		this.bookingConfirmationCode = bookingConfirmationCode;
		  System.out.println(" from the booking room entity class  " + "  bookingId :   " + bookingId + "  checkInDate :  " + checkInDate + "  checkOutDate :  " + checkOutDate + "  guestFullName  " + guestFullName + "  NumofAdults  " + NumofAdults + "  NumofChildren  " + NumofChildren + "  totalNumofGuest  " + totalNumofGuest);
	}

	public Long getBookingId() {
		return bookingId;
		
	}

	public LocalDate getCheckInDate() {
		return checkInDate;
	}

	public LocalDate getCheckOutDate() {
		return checkOutDate;
	}

	public String getBookingConfirmationCode() {
		return bookingConfirmationCode;
	}

	public String getGuestFullName() {
		return guestFullName;
	}

//	public void setGuestFullName(String guestFullName) {
//		this.guestFullName = guestFullName;
//	}

	public String getGuestEmail() {
		return guestEmail;
	}

//	public void setGuestEmail(String guestEmail) {
//		this.guestEmail = guestEmail;
//	}

	public int getTotalNumofGuest() {
		return totalNumofGuest;
	}

//	public void setTotalNumofGuest(int totalNumofGuest) {
//		this.totalNumofGuest = totalNumofGuest;
//	}

	public int getNumofAdults() {
		return NumofAdults;
	}

	public int getNumofChildren() {
		return NumofChildren;
	}

	public Room getRoom() {
		return room;
	}

	public void setBookingId(Long bookingId) {
		this.bookingId = bookingId;
	}

	public void setCheckInDate(LocalDate checkInDate) {
		this.checkInDate = checkInDate;
	}

	public void setCheckOutDate(LocalDate checkOutDate) {
		this.checkOutDate = checkOutDate;
	}

	
	

}
