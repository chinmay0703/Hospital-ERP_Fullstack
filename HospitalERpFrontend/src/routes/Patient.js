import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer/Footer";
import "./Patient.css";
function Patient() {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    address: "",
    patientPackage: "", // Default package will be set later
    paymentMethod: "Credit Card",
    date: getCurrentDate(),
    packageId: "", 
    mobile: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "patientPackage") {
      const [packageId, timeperiod] = value.split(","); 
      setFormData({
        ...formData,
        patientPackage: value, 
        packageId: packageId, 
      });
    } else {
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

  useEffect(() => {
    axios
      .get("http://localhost:8080/package/get")
      .then((response) => {
        const packagesData = response.data;
        if (packagesData.length > 0) {
          const defaultPackage = packagesData[0];
          const defaultPackageValue = `${defaultPackage.id},${defaultPackage.timeperiod}`;
          setFormData({
            ...formData,
            patientPackage: defaultPackageValue,
            packageId: defaultPackage.id,
          });
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching packages:", error);
        setLoading(false); 
      });
  }, []); 

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (formData.mobile.length !== 10 || !/^\d+$/.test(formData.mobile)) {
      toast.error("Please enter 10-digit mobile number");
      return; 
    }
  
    axios
      .post("http://localhost:8080/patient/save", formData)
      .then((response) => {
        console.log("Response:", response.data);
        toast.success("Patient Added");
        navigate("/AllPatients");
  
        setFormData({
          name: "",
          lastname: "",
          address: "",
          patientPackage: "", 
          paymentMethod: "Credit Card",
          date: getCurrentDate(),
          packageId: "", 
          mobile: "", 
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  

  const activeItem = "Patient";
  const setActiveItem = (itemName) => {
    console.log(`Setting active item to ${itemName}`);
  };

  const [packages, setPackages] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/package/get")
      .then((response) => {
        setPackages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching packages:", error);
      });
  }, []);
  return (
    <div className="App">
      <Navbar activeItem={activeItem} setActiveItem={setActiveItem} />
      <h2 className="my-2">Patient Information</h2>
      <div className="patient-form-container my-3">
        {loading ? (
          <div>Loading...</div>
        ) : (
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
              <label htmlFor="patientPackage">Select Package</label>
              <select
                id="patientPackage"
                name="patientPackage"
                value={formData.patientPackage}
                onChange={handleChange}
              >
                {packages.map((packageItem) => (
                  <option
                    key={packageItem.id}
                    value={`${packageItem.id},${packageItem.timeperiod}`}
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
              <label htmlFor="mobile">Mobile No</label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
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
        )}
      </div>
      <Footer />
    </div>
  );
}
export default Patient;
