import Navbar from "../components/Navbar";
import "../routes/Home.css";
import React, { useState } from "react";
import Footer from "../components/Footer/Footer";
import "./Patient.css";
import axios from "axios";
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

function FormPackage() {
    const [formData, setFormData] = useState({
        timeperiod: "",
        amount: "",
        persessioncharges: "",
        joint:"",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post("http://localhost:8080/package/save", formData)
            .then((response) => {
                console.log("Response:", response.data);
                toast.success("Package added");
                navigate("/packages");

                setFormData({
                    timeperiod: "",
                    amount: "",
                    persessioncharges: "",
                    joint:"",
                });
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const activeItem = "form";
    const setActiveItem = (itemName) => {
        console.log(`Setting active item to ${itemName}`);
    };
    return (
        <div className="App">
            <Navbar activeItem={activeItem} setActiveItem={setActiveItem} />
            <div className="patient-form-container my-3">
                <form className="patient-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="timeperiod">Time Period</label>
                        <input
                            type="text"
                            id="timeperiod"
                            name="timeperiod"
                            value={formData.timeperiod}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="amount">Joint</label>
                        <input
                            type="text"
                            id="joint"
                            name="joint"
                            value={formData.joint}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="amount">Amount</label>
                        <input
                            type="text"
                            id="amount"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            required
                        />
                    </div>
                   
                    <div className="form-group">
                        <label htmlFor="persessioncharges">Per Session charges</label>
                        <input
                            type="text"
                            id="persessioncharges"
                            name="persessioncharges"
                            value={formData.persessioncharges}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <Footer />
        </div>
    );
}
export default FormPackage;
