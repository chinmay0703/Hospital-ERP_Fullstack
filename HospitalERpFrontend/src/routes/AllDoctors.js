import Navbar from "../components/Navbar";
import "../routes/Home.css";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer/Footer";
import axios from "axios";
import {useNavigate } from "react-router-dom";

function AllDoctors() {
    const [Doctors, setDoctors] = useState([]);
    const activeItem = "AllDoctors";
    const setActiveItem = (itemName) => {
        console.log(`Setting active item to ${itemName}`);
    };

    useEffect(() => {
        axios
            .get("http://localhost:8080/doctor/get")
            .then((response) => {
                console.log("error")
                setDoctors(response.data);
            })
            .catch((error) => {
                console.error("Error fetching patients:", error);
            });
    }, []);
    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:8080/doctor/delete/${id}`, {
                withCredentials: true,
            })
            .then(() => {
                const updatedDoctors = Doctors.filter((Doctor) => Doctor.id !== id);
                setDoctors(updatedDoctors);
            })
            .catch((error) => {
                console.error("Error deleting patient:", error);
            });
    };
    const navigate=useNavigate();
    const handleEdit = (id) => {
        localStorage.setItem("DoctorId",id)
        navigate("/EditDoctors")
    };
    return (
        <div className="App">
            <Navbar activeItem={activeItem} setActiveItem={setActiveItem} />
            <div className="container">
                <div className="Doctor-list">
                    <h2 className="my-3">Doctor List</h2>
                    <table className="table">
                        <thead className="table-dark">
                            <tr>
                                <th>Name</th>
                                <th>Last Name</th>
                                <th>age</th>
                                <th>Joining-Date</th>
                                <th>Mobile No</th>
                                <th>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {Doctors.map((Doctor) => (
                                <tr key={Doctor.id}>
                                    <td>{Doctor.name}</td>
                                    <td>{Doctor.lastname}</td>
                                    <td>{Doctor.age}</td>
                                    <td>{Doctor.date}</td>
                                    <td>{Doctor.mobileno}</td>
                                    <td><button className="btn btn-danger"  onClick={() => handleDelete(Doctor.id)}>Delete</button>
                                    <button className="btn btn-info mx-3"  onClick={() => handleEdit(Doctor.id)}>Edit</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>


            <Footer />
        </div>
    );
}

export default AllDoctors;
