import Navbar from "../components/Navbar";
import "../routes/Home.css";
import React, { useState, useEffect } from "react";
import Footer from "../components/Footer/Footer";
import axios from "axios";
import { Link ,useNavigate} from "react-router-dom";

function Packages() {
    const [packages, setPackages] = useState([]);

    const activeItem = "Packages";
    const setActiveItem = (itemName) => {
        console.log(`Setting active item to ${itemName}`);
    };
    const navigate = useNavigate();
    useEffect(() => {
        // Fetch data from the server
        axios
            .get("http://localhost:8080/package/get")
            .then((response) => {
                setPackages(response.data);
                
            })
            .catch((error) => {
                console.error("Error fetching packages:", error);
            });
    }, []);
    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:8080/package/delete/${id}`, {
                withCredentials: true,
            })
            .then(() => {
                const updatedpackage = packages.filter((packages) => packages.id !== id);
                setPackages(updatedpackage);
            })
            .catch((error) => {
                console.error("Error deleting patient:", error);
            });
    };
    const handleEdit = (id) => {
       
        localStorage.setItem("PackageId",id);
        navigate("/editpackage")
    };
    

    return (
        <div className="App">
            <Navbar activeItem={activeItem} setActiveItem={setActiveItem} />
            <Link to="/form">
                <button className="btn btn-secondary my-3">Add Package</button>
            </Link>
            <div className="container">
                <h2>Package List</h2>
                <table className="table">
                    <thead className="table-dark">
                        <tr>
                            <th>Time Period</th>
                            <th>Joint</th>
                            <th>Amount</th>
                            <th>Per Session Charges</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {packages.map((pkg) => (
                            <tr key={pkg.id}>
                                <td>{pkg.timeperiod}</td>
                                <td>{pkg.joint}</td>
                                <td>{pkg.amount}</td>
                                <td>{pkg.persessioncharges}</td>
                                <td><button className="btn btn-danger" onClick={() => handleDelete(pkg.id)}>Delete</button>
                                <button className="btn btn-info mx-2" onClick={() => handleEdit(pkg.id)}>Edit</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    );
}

export default Packages;
