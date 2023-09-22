import React, { useState,useRef } from "react"
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import { useParams,useHistory } from 'react-router-dom'
import {startEditPg} from '../actions/pgDetailsActions'

const EditPG = () => {
    const { pgDetailsId } = useParams()
    
    const pgDetails = useSelector((state) => state.pgDetails.pgDetails)
    const selectedPG = pgDetails.find((pg) => pg._id === pgDetailsId)

    const [name, setName] = useState(selectedPG ? selectedPG.name : "")
    const [address, setAddress] = useState(selectedPG ? selectedPG.address : "")
    const [contact, setContact] = useState(selectedPG ? selectedPG.contact : "")
    const [rooms, setRooms] = useState(selectedPG ? selectedPG.totalRooms : "")
    const [pricing, setPricing] = useState(
        selectedPG ? selectedPG.pricing : [{ share: "", amount: "" }]
    )
    const [facilities, setFacilities] = useState(
        selectedPG ? selectedPG.facilities : []
    )
    const [pgType, setPgType] = useState(selectedPG ? selectedPG.pgType : "")
    const [foodType, setFoodType] = useState(
        selectedPG ? selectedPG.foodType : ""
    )
    const [nearByPlaces, setNearByPlaces] = useState(
        selectedPG ? selectedPG.nearByPlaces : [{ name: "", distance: "" }]
    )
    const [images, setImages] = useState(selectedPG ? selectedPG.images : [])

    const fileInputRef = useRef(null)

    const facilitiesOptions = [
        { value: "wifi", label: "Wi-Fi" },
        { value: "washing_machine", label: "Washing Machine" },
        { value: "geyser", label: "Geyser" },
    ]

    // Function to handle changes in facilities (React-Select)
    const handleFacilitiesChange = (selectedOptions) => {
        setFacilities(selectedOptions.map((option) => option.value))
    }

    // Function to handle file input change
    const handleFileChange = (e) => {
        setImages([...images, ...e.target.files])
    }

    // Function to add a new pricing field
    const addPricingField = () => {
        setPricing([...pricing, { share: "", amount: "" }])
    }

    // Function to remove a pricing field by index
    const removePricingField = (index) => {
        const updatedPricing = [...pricing]
        updatedPricing.splice(index, 1)
        setPricing(updatedPricing)
    }

    // Function to handle changes in pricing fields
    const handlePricingChange = (index, field, value) => {
        const updatedPricing = [...pricing]
        updatedPricing[index][field] = value
        setPricing(updatedPricing)
    }

    // Function to add a new nearByPlaces field
    const addNearByPlacesField = () => {
        setNearByPlaces([...nearByPlaces, { name: "", distance: "" }])
    }

    // Function to remove a nearByPlaces field by index
    const removeNearByPlacesField = (index) => {
        const updatedNearByPlaces = [...nearByPlaces]
        updatedNearByPlaces.splice(index, 1)
        setNearByPlaces(updatedNearByPlaces)
    }

    // Function to handle changes in nearByPlaces fields
    const handleNearByPlacesChange = (index, field, value) => {
        const updatednearByPlaces = [...nearByPlaces]
        updatednearByPlaces[index][field] = value
        setNearByPlaces(updatednearByPlaces)
    }

    const dispatch = useDispatch();
    const history = useHistory();


    const reset = () => {
        setName("")
        setAddress("")
        setContact("")
        setRooms("")
        setPricing([{ share: "", amount: "" }])
        setFacilities([])
        setPgType("")
        setFoodType("")
        setNearByPlaces([{ name: "", distance: "" }])
        setImages([])
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = {
        name,
        address,
        contact,
        totalRooms: rooms,
        pgType,
        foodType,
        pricing,
        facilities,
        nearByPlaces,
        images
        }
        console.log('editPg-res',formData)
        dispatch(startEditPg(pgDetailsId, formData, reset))
        history.push(`/selectpg`)
    }

    return (
        <div>
            <h2>Edit PG</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <label>Enter PG Name</label> <br />
                <input
                    type="text"
                    placeholder="Enter Pg name"
                    name="name"
                    value={name}
                    onChange={(e) => {setName(e.target.value) }}
                /> <br />
                <label>Enter PG Address</label> <br />
                <input
                    type="text"
                    placeholder="Enter Address"
                    name="address"
                    value={address}
                    onChange={(e) => { setAddress(e.target.value) }}
                /> <br />
                <label>Contact:</label><br />
                <input
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                /><br />
                <label>Total Rooms:</label><br />
                <input
                    type="number"
                    value={rooms}
                    onChange={(e) => setRooms(e.target.value)}
                /><br />
                <label>Pricing:</label> <br />
                {pricing.map((price, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            placeholder="Share"
                            value={price.share}
                            onChange={(e) => handlePricingChange(index, "share", e.target.value)}
                        /> <br />
                        <input
                            type="text"
                            placeholder="Amount"
                            value={price.amount}
                            onChange={(e) => handlePricingChange(index, "amount", e.target.value)}
                        /> <br />
                        <button type="button" onClick={() => removePricingField(index)}>Remove</button> <br />
                    </div>
                ))}
                <button type="button" onClick={addPricingField}>Add Pricing</button> <br />
                <label>Facilities:</label> <br />
                <Select
                    isMulti
                    options={facilitiesOptions}
                    value={facilitiesOptions.filter((option) =>
                        facilities.includes(option.value)
                    )}
                    onChange={handleFacilitiesChange}
                />
                <br />
                <label>PG Type:</label> <br />
                <select value={pgType} onChange={(e) => setPgType(e.target.value)}>
                    <option value=''>Select pg type</option>
                    <option value='Boys'>Boys</option>
                    <option value='Girls'>Girls</option>
                    <option value='Co-Living'>Co-Living</option>
                </select> <br />
                <label>Food Type:</label> <br />
                <select value={foodType} onChange={(e) => setFoodType(e.target.value)}>
                    <option value=''>Select food type</option>
                    <option value='Veg'>Veg</option>
                    <option value='Veg&Non-Veg'>Veg&Non-Veg</option>
                </select><br />
                <label>Nearby Places:</label> <br />
                {nearByPlaces.map((nearByPlace, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            placeholder="Name"
                            value={nearByPlace.name}
                            onChange={(e) => handleNearByPlacesChange(index, "name", e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Distance"
                            value={nearByPlace.distance}
                            onChange={(e) => handleNearByPlacesChange(index, "distance", e.target.value)}
                        />
                        <button type="button" onClick={() => removeNearByPlacesField(index)}>Remove</button>
                    </div>
                ))}
                <button type="button" onClick={addNearByPlacesField}>Add Nearby Place</button> <br />
                <label>Images:</label> <br />
                <input
                    type="file"
                    multiple
                    name="images"
                    accept=".png, .jpg, .jpeg"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                /><br />
                <button type="submit">Edit PG</button>
                <button onClick={() => history.push('/selectpg')}>Close</button>
            </form>
        </div>
    )
}

export default EditPG