import React, { useState,useContext, useRef } from "react"
import Select from 'react-select'
import {useDispatch} from 'react-redux'
import {startCreatePG} from '../actions/pgDetailsActions'

import { RoleContext } from "./NavBar"

const AddPG = (props) => {
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [contact, setContact] = useState('')
    const [rooms, setRooms] = useState('')
    const [pricing, setPricing] = useState([{ share: "", amount: "" }])
    const [facilities, setFacilities] = useState([])
    const [pgType, setPgType] = useState('')
    const [foodType, setFoodType] = useState('')
    const [nearByPlaces, setNearByPlaces] = useState([{ name: "", distance: "" }])
    const [images, setImages] = useState([])

    const fileInputRef = useRef(null) // Create a ref for the file input element

    const {role} = useContext(RoleContext)

    const facilitiesOptions = [
        { value: "wifi", label: "Wi-Fi" },
        { value: "washing_machine", label: "Washing Machine" },
        { value : "geyser", label : "Geyser"}
    ]
    // Function to handle changes in facilities (React-Select)
    const handleFacilitiesChange = (selectedOptions) => {
        setFacilities(selectedOptions.map((option) => option.value))
    }
    
    // Function to handle file input change
    const handleFileChange = (e) => {
        setImages(e.target.files)
    }

    // Function to add a new pricing field
    const addPricingField = () => {
        setPricing([...pricing, { share: "", amount: "" }])
    }

    // Function to remove a pricing field by index
    const removePricingField = (index) => {
        const updatedpricing = [...pricing]
        updatedpricing.splice(index, 1)
        setPricing(updatedpricing)
    }

    // Function to handle changes in pricing fields
    const handlePricingChange = (index, field, value) => {
        const updatedpricing = [...pricing]
        updatedpricing[index][field] = value
        setPricing(updatedpricing)
    }

        // Function to add a new nearByPlaces field
    const addNearByPlacesField = () => {
        setNearByPlaces([...nearByPlaces, { name: "", distance: "" }])
    }

    // Function to remove a nearByPlaces field by index
    const removeNearByPlacesField = (index) => {
        const updatednearByPlaces = [...nearByPlaces]
        updatednearByPlaces.splice(index, 1)
        setNearByPlaces(updatednearByPlaces)
    }

    // Function to handle changes in nearByPlaces fields
    const handleNearByPlacesChange = (index, field, value) => {
        const updatednearByPlaces = [...nearByPlaces]
        updatednearByPlaces[index][field] = value
        setNearByPlaces(updatednearByPlaces)
    }

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        
        // Create a new FormData object
        const formData = new FormData()
        formData.append('name', name)
        formData.append('address', address)
        formData.append('contact', contact)
        formData.append('totalRooms', rooms)
        formData.append('pgType', pgType)
        formData.append('foodType', foodType)

        // Append selected files to the formData object
        for (let i = 0; i < images.length ;i++) {
            formData.append('images', images[i])
        }

        // Append facilities as an array
        facilities.forEach((facility) => {
            formData.append('facilities', facility)
        })
        // Append pricing as an array of objects
        pricing.forEach((price, index) => {
            formData.append(`pricing[${index}][share]`, price.share)
            formData.append(`pricing[${index}][amount]`, price.amount)
        })

        // Append nearbyPlaces as an array of objects
        nearByPlaces.forEach((place, index) => {
            formData.append(`nearByPlaces[${index}][name]`, place.name)
            formData.append(`nearByPlaces[${index}][distance]`, place.distance)
        })

        const reset = () => {
            // Clear the form after successful submission
            setName('')
            setAddress('')
            setContact('')
            setRooms('')
            setPricing([{ share: '', amount: '' }])
            setFacilities([])
            setPgType('')
            setFoodType('')
            setNearByPlaces([{ name: '', distance: '' }])
            setImages([])
            fileInputRef.current.value = ""
        }

        dispatch(startCreatePG(formData, reset))
    }

    return(
        <div>
            {role === 'pg_admin' && (
                <div>
                    <h2> Add PG </h2>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <label>Enter PG Name</label> <br />
                        <input 
                            type = "text" 
                            placeholder="enter pg name" 
                            name='name' 
                            value={name} 
                            onChange={(e)=>{setName(e.target.value)}}
                        /> <br />
                        <label>Enter PG Address</label> <br />
                        <input
                            type = "text"
                            placeholder = "enter address"
                            name = 'address'
                            value = {address}
                            onChange={(e)=>{setAddress(e.target.value)}}
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
                        {pricing.map((pricing, index) => (
                            <div key={index}>
                            <input
                                type="text"
                                placeholder="Share"
                                value={pricing.share}
                                onChange={(e) => handlePricingChange(index, "share", e.target.value)}
                            /> <br />
                            <input
                                type="text"
                                placeholder="Amount"
                                value={pricing.amount}
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
                            <option value = ''>Select pg type</option>
                            <option value="Boys">Boys</option>
                            <option value="Girls">Girls</option>
                            <option value="Co-Living">Co-Living</option>
                        </select> <br />
                        <label>Food Type:</label> <br />
                        <select value={foodType} onChange={(e) => setFoodType(e.target.value)}>
                            <option value = ''>Select food type</option>
                            <option value="Veg">Veg</option>
                            <option value="Veg&Non-Veg">Veg&Non-Veg</option>
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
                        <button type="submit">Add PG</button>
                    </form>
                </div>
            )}
         </div>
    )
}

export default AddPG

