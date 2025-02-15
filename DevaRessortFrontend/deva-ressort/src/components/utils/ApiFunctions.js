import axios from "axios"

export const api = axios.create({
    baseURL : "http://localhost:9775"
})


export const getHeader = () => {
	const token = localStorage.getItem("token")
	return {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json"
	}
}


/* This function adds a new room room to the database */
export async function addRoom(photo, roomType, roomPrice) {
	const formData = new FormData()
	formData.append("photo", photo)
	formData.append("roomType", roomType)
	formData.append("roomPrice", roomPrice)

	const response = await api.post("/rooms/add/new-room", formData)
	if (response.status === 201) {
		return true
	} else {
		return false
	}
}

/* This function gets all room types from thee database */
export async function getRoomTypes() {
	try {
		const response = await api.get("/rooms/room/types")
		return response.data
	} catch (error) {
		console.error("Error fetching room types", error);
		throw new Error("Error fetching room types")
	}
}

/* This function gets all rooms from the database */
export async function getAllRooms() {
	try {
		const result = await api.get("/rooms/all-rooms")
		return result.data
	} catch (error) {
		throw new Error("Error fetching rooms")
	}
}

/* This function deletes a room by the Id */
export async function deleteRoom(roomId) {
	try {
		const result = await api.delete(`/rooms/delete/room/${roomId}`)
		return result.data
	} catch (error) {
		throw new Error(`Error deleting room ${error.message}`)
	}
}


/* This function update a room */
export async function updateRoom(roomId, roomData) {
	const formData = new FormData()
	formData.append("roomType", roomData.roomType)
	formData.append("roomPrice", roomData.roomPrice)
	formData.append("photo", roomData.photo)
	const response = await api.put(`/rooms/update/${roomId}`) //modified 2.00 pm day 7
	return response
}


/* This funcction gets a room by the id */
export async function getRoomById(roomId) {
	try {
		const result = await api.get(`/rooms/room/${roomId}`)
		return result.data
	} catch (error) {
		throw new Error(`Error fetching room ${error.message}`)
	}
}

// /* This function saves a new booking to the databse */
// export async function bookRoom(roomId, booking) {
// 	try {
// 		const response = await api.post(`/bookings/room/${roomId}/booking`, booking)
// 		return response.data
// 	} catch (error) {
// 		if (error.response && error.response.data) {
// 			throw new Error(error.response.data)
// 		} else {
// 			throw new Error(`Error booking room : ${error.message}`)
// 		}
// 	}
// }


// export async function bookRoom(roomId, booking) {
// 	try {
// 		const response = await api.post(`/bookings/room/${roomId}/booking`, booking, {
// 			headers: {
// 				"Content-Type": "application/json"
// 			}
// 		})
// 		return response.data
// 	} catch (error) {
// 		if (error.response && error.response.data) {
// 			throw new Error(error.response.data)
// 		} else {
// 			throw new Error(`Error booking room: ${error.message}`)
// 		}
// 	}
// }



export async function bookRoom(roomId, booking) {
	try {
		console.log("Booking Data Sent to Backend:", { roomId, booking }); // Log data before sending

		const response = await api.post(`/bookings/room/${roomId}/booking`, booking, {
			headers: {
				"Content-Type": "application/json"
			}
		});

		console.log("Booking Response from Backend:", response.data); // Log response data
		return response.data;
	} catch (error) {
		if (error.response && error.response.data) {
			console.error("Booking Error Response:", error.response.data); // Log error response
			throw new Error(error.response.data);
		} else {
			console.error(`Error booking room: ${error.message}`);
			throw new Error(`Error booking room: ${error.message}`);
		}
	}
}



/* This function gets alll bokings from the database */
export async function getAllBookings() {
	try {
		const result = await api.get("/bookings/all-bookings", {
			headers: getHeader(),
			// method: "GET",
		})
		return result.data
	} catch (error) {
		throw new Error(`Error fetching bookings : ${error.message}`)
	}
}

/* This function get booking by the cnfirmation code */
export async function getBookingByConfirmationCode(confirmationCode) {
	try {
		const result = await api.get(`/bookings/confirmation/${confirmationCode}`)
		return result.data
	} catch (error) {
		if (error.response && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`Error find booking : ${error.message}`)
		}
	}
}

/* This is the function to cancel user booking */
export async function cancelBooking(bookingId) {
	try {
		const result = await api.delete(`/bookings/booking/${bookingId}/delete`)
		return result.data
	} catch (error) {
		throw new Error(`Error cancelling booking :${error.message}`)
	}
}








// export const loginUser = async (userData) => {
// 	try {
// 	  const response = await fetch("http://localhost:9765/api/users/register", {
// 		method: "POST",
// 		headers: { "Content-Type": "application/json" },
// 		body: JSON.stringify(userData),
// 	  });
  
// 	  const result = await response.json();
// 	  console.log(result); // Debugging - Check API response
// 	  return result;
// 	} catch (error) {
// 	  throw new Error("Login Successfully! ✅");
	  
// 	}
//   };
  
// const API_URL = "http://localhost:8080/auth";

export const registerUser = async (userData) => {
  try {
    const response = await fetch("http://localhost:9775/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return await response.json();
  } catch (error) {
    console.error("Registration Error:", error);
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await fetch("http://localhost:9775/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return await response.json();
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};
