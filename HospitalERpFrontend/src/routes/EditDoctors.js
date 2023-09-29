import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer/Footer";
import "../routes/Home.css";
import "./Patient.css"; // Import the same CSS file

function EditDoctors() {
    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
        age: "",
        date: "",
        adharcard: "", // Added "Adhar Card" field
        mobileno: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        const doctorId = localStorage.getItem("DoctorId");

        axios
            .get(`http://localhost:8080/doctor/getById/${doctorId}`)
            .then((response) => {
                const doctorData = response.data;
                setFormData({
                    name: doctorData.name,
                    lastname: doctorData.lastname,
                    age: doctorData.age,
                    date: doctorData.date,
                    adharcard: doctorData.adharcard, // Set the value for "Adhar Card"
                    mobileno: doctorData.mobileno,
                });
            })
            .catch((error) => {
                console.error("Error fetching doctor details:", error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const doctorId = localStorage.getItem("DoctorId");

        axios
            .put(`http://localhost:8080/doctor/update/${doctorId}`, formData)
            .then((response) => {
                console.log("Response:", response.data);
                toast.success("Doctor Updated");
                navigate("/AllDoctors");
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const activeItem = "AllDoctors";

    const setActiveItem = (itemName) => {
        console.log(`Setting active item to ${itemName}`);
    };

    return (
        <div className="App">
            <Navbar activeItem={activeItem} setActiveItem={setActiveItem} />
            <h2 className="my-2">Edit Doctor Information</h2>
            <div className="patient-form-container my-3"> {/* Reuse the CSS class */}
            <form className="patient-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">First Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name} // Display the value from formData
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname} // Display the value from formData
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="text"
              id="age"
              name="age"
              value={formData.age} // Display the value from formData
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="adharcard">Adhar Card</label>
            <input
              type="text"
              id="adharcard"
              name="adharcard"
              value={formData.adharcard} // Display the value from formData
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobileno">Mobile Number</label>
            <input
              type="text"
              id="mobileno"
              name="mobileno"
              value={formData.mobileno} // Display the value from formData
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Joining Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date} // Display the value from formData
              onChange={handleChange}
              required
              style={{ marginLeft: 0 }}
            />
          </div>
          <button type="submit" method="post">Submit</button>
        </form>
            </div>
            <Footer />
        </div>
    );
}

export default EditDoctors;
