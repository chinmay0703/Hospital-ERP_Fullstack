import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer/Footer";
import "../routes/Home.css";
import "./Patient.css";

function EditPatients() {
    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
        address: "",
        mobile: "", // Add the mobile field
        patientPackage: "",
        paymentMethod: "Credit Card",
        packageId: "",
        date: getCurrentDate(),
    });

    const [selectedPackageId, setSelectedPackageId] = useState("");
    const [packages, setPackages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch packages from the server
        axios
            .get("http://localhost:8080/package/get")
            .then((response) => {
                setPackages(response.data);
            })
            .catch((error) => {
                console.error("Error fetching packages:", error);
            });

        const patientId = localStorage.getItem("PatientId");
        axios
            .get(`http://localhost:8080/patient/getById/${patientId}`)
            .then((response) => {
                const patientData = response.data;
                setFormData({
                    name: patientData.name,
                    lastname: patientData.lastname,
                    address: patientData.address,
                    mobile: patientData.mobile, // Set the mobile field
                    // Set the initial value to include both packageId and patientPackage
                    patientPackage: `${patientData.packageId},${patientData.patientPackage}`,
                    paymentMethod: patientData.paymentMethod,
                    packageId: patientData.packageId,
                    date: patientData.date,
                });
                setSelectedPackageId(patientData.packageId);
            })
            .catch((error) => {
                console.error("Error fetching patient details:", error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "patientPackageSelect") {
            // Update the selected package ID in the state
            setSelectedPackageId(value);
        } else if (name === "patientPackage") {
            // Update the patientPackage in the formData
            setFormData({
                ...formData,
                [name]: value,
            });
        } else {
            // For other fields, update formData as usual
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    function getCurrentDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        formData.packageId = selectedPackageId;
        const patientId = localStorage.getItem("PatientId");

        axios
            .put(`http://localhost:8080/patient/update/${patientId}`, formData)
            .then((response) => {
                console.log("Response:", response.data);
                toast.success("Patient Updated");
                navigate("/AllPatients");
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const activeItem = "Patient";

    const setActiveItem = (itemName) => {
        console.log(`Setting active item to ${itemName}`);
    };

    return (
        <div className="App">
            <Navbar activeItem={activeItem} setActiveItem={setActiveItem} />
            <h2 className="my-2">Edit Patient Information</h2>
            <div className="patient-form-container my-3">
                <form className="patient-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">First Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
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
                            value={formData.lastname}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobile">Mobile No</label> {/* Add Mobile No field */}
                        <input
                            type="text"
                            id="mobile"
                            name="mobile" // Ensure the name attribute is "mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/* Hide the upper input box for the package */}
                    <div className="form-group" style={{ display: "none" }}>
                        <label htmlFor="patientPackage">Select Package</label>
                        <input
                            type="text"
                            id="patientPackage"
                            name="patientPackage"
                            value={formData.patientPackage}
                            readOnly
                        />
                    </div>
                    {/* Display the package selection dropdown */}
                    <div className="form-group">
                        <label htmlFor="patientPackageSelect">Select Package</label>
                        <select
                            id="patientPackageSelect"
                            name="patientPackageSelect"
                            value={selectedPackageId}
                            onChange={handleChange}
                        >
                            {packages.map((packageItem) => (
                                <option
                                    key={packageItem.id}
                                    value={packageItem.id}
                                >
                                    {`${packageItem.timeperiod}, joint=${packageItem.joint}, TotalAmount=${packageItem.amount}`}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="paymentMethod">Payment Method</label>
                        <select
                            id="paymentMethod"
                            name="paymentMethod"
                            value={formData.paymentMethod}
                            onChange={handleChange}
                        >
                            <option value="Credit Card">Credit Card</option>
                            <option value="PayPal">PayPal</option>
                            <option value="Cash">Cash</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Date</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            style={{ marginLeft: 0 }}
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default EditPatients;
