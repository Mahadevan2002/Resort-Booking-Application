import React, { useState, useEffect } from "react";
import { getRoomTypes } from "../utils/ApiFunctions";

const RoomTypeSelector = ({ handleRoomInputChange, newRoom = {} }) => {
    const [roomTypes, setRoomTypes] = useState([]);
    const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false);
    const [newRoomType, setNewRoomType] = useState("");

    // Fetch room types when component mounts
    useEffect(() => {
        getRoomTypes().then((data) => {
            setRoomTypes(data); // Set the fetched room types
        });
    }, []);

    const handleNewRoomTypeInputChange = (e) => {
        setNewRoomType(e.target.value); // Update the new room type input value
    };

    const handleAddNewRoomType = () => {
        if (newRoomType !== "") {
            // Add new room type to the roomTypes array
            setRoomTypes((prevRoomTypes) => [...prevRoomTypes, newRoomType]);
            setNewRoomType(""); // Clear the input after adding
            setShowNewRoomTypeInput(false); // Hide the input field

            // Update parent component with the new room type
            handleRoomInputChange({
                target: { name: "roomType", value: newRoomType },
            });
        }
    };

    return (
        <div>
            <select
                required
                className="form-select"
                name="roomType"
                onChange={(e) => {
                    if (e.target.value === "Add New") {
                        setShowNewRoomTypeInput(true); // Show the input for adding a new room type
                    } else {
                        handleRoomInputChange(e); // Pass selected room type to parent component
                    }
                }}
                value={newRoom.roomType || ""} // Ensure newRoom.roomType is safely accessed
            >
                <option value="">Select a room type</option>
                <option value="Add New">Add New</option>
                {roomTypes.map((type, index) => (
                    <option key={index} value={type}>
                        {type}
                    </option>
                ))}
            </select>

            {showNewRoomTypeInput && (
                <div className="mt-2">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter New Room Type"
                            value={newRoomType}
                            onChange={handleNewRoomTypeInputChange}
                        />
                        <button
                            className="btn btn-hotel"
                            type="button"
                            onClick={handleAddNewRoomType}
                        >
                            Add
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoomTypeSelector;
