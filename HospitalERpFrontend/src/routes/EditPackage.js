import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer/Footer";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./EditPackage.css";

function EditPackage() {
    const [packages, setPackages] = useState({
        id: "",
        timeperiod: "",
        amount: "",
        persessioncharges: "",
        joint: "",
    });

    const { id, timeperiod, amount, persessioncharges, joint } = packages;
    const navigate = useNavigate();
    const activeItem = "EditPackage";

    useEffect(() => {
        const id = localStorage.getItem('PackageId');
        axios
            .get("http://localhost:8080/package/getById?id=" + id)
            .then((response) => {
                setPackages(response.data);
            })
            .catch((error) => {
                console.error("Error fetching packages:", error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPackages({
            ...packages,
            [name]: value,
        });
    };

    const handleUpdate = () => {
        navigate("/packages"); // Redirect to the desired page after updating
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedData = {
            id: id,
            timeperiod: timeperiod,
            amount: amount,
            persessioncharges: persessioncharges,
            joint: joint,
        };

        try {
            const apiUrl = "http://localhost:8080/package/save";
            const response = await axios.post(apiUrl, updatedData);

            console.log("Data successfully submitted:", response.data);

            // After successful submission, navigate to the desired page
            handleUpdate();
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };

    return (
        <div className="App">
            <Navbar activeItem={activeItem} />
            <div className="patient-form-container my-3">
                <form className="patient-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="hidden"
                            id="id"
                            name="id"
                            value={id}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="timeperiod">Time Period</label>
                        <input
                            type="text"
                            id="timeperiod"
                            name="timeperiod"
                            value={timeperiod}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="joint">Joint</label>
                        <input
                            type="text"
                            id="joint"
                            name="joint"
                            value={joint}
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
                            value={amount}
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
                            value={persessioncharges}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button className="btn btn-primary" type="submit">
                        Update
                    </button>
                    <Link to="/packages">
                    <button className="btn btn-danger mx-2" style={{ backgroundColor: 'rgba(255, 0, 0, 0.7)' }}>Cancel</button>
                    </Link>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default EditPackage;
