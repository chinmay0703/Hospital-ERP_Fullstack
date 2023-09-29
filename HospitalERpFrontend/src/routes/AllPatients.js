import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer/Footer";
import { useNavigate } from "react-router-dom";

function AllPatients() {
  const [patients, setPatients] = useState([]);
  const [packages, setPackages] = useState({});
  const [patientCount, setPatientCount] = useState(0);
  const [messages, setMessages] = useState(JSON.parse(localStorage.getItem("messages")) || {});
  const [searchInput, setSearchInput] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:8080/patient/get")
      .then((response) => {
        const patientData = response.data;
        setPatients(patientData);
        const count = patientData.length;
        setPatientCount(count);
        console.log(`Total Patients: ${count}`);
      })
      .catch((error) => {
        console.error("Error fetching patients:", error);
      });
    axios
      .get("http://localhost:8080/package/get")
      .then((response) => {
        const packageData = response.data;
        const packageDetails = {};

        packageData.forEach((packageItem) => {
          packageDetails[packageItem.id] = packageItem;
        });
        setPackages(packageDetails);
      })
      .catch((error) => {
        console.error("Error fetching packages:", error);
      });
  }, []);
  useEffect(() => {
    const filtered = patients.filter((patient) =>
      patient.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredPatients(filtered);
  }, [patients, searchInput]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/patient/delete/${id}`, {
        withCredentials: true,
      })
      .then(() => {
        const updatedPatients = patients.filter((patient) => patient.id !== id);
        setPatients(updatedPatients);
        const count = updatedPatients.length;
        setPatientCount(count);
      })
      .catch((error) => {
        console.error("Error deleting patient:", error);
      });
  };

  const handleEdit = (id) => {
    localStorage.setItem("PatientId", id);
    navigate("/EditPatients");
  };

  const handleAppoint = (id) => {
    const patientToAppoint = patients.find((patient) => patient.id === id);

    if (patientToAppoint) {
      const recipientNumber = `+${patientToAppoint.mobile}`;
      const message = prompt("Enter appointment timing (e.g., 10:00 AM):");

      if (message !== null) {
        const updatedMessages = {
          ...messages,
          [id]: message,
        };

        // Save updated messages to local storage
        localStorage.setItem("messages", JSON.stringify(updatedMessages));

        setMessages(updatedMessages);

        const encodedMessage = encodeURIComponent(
          `Dear ${patientToAppoint.name}, this is a reminder for your upcoming physiotherapy session at REBALANCE Clinic scheduled for ${message}.Date:${patientToAppoint.date} Please arrive on time. If you have any questions or need to reschedule, please contact us. Thank you!`
        );
        const whatsappURL = `https://api.whatsapp.com/send?phone=${recipientNumber}&text=${encodedMessage}`;

        const whatsappWindow = window.open(whatsappURL, "_blank");

        setTimeout(() => {
          if (whatsappWindow) {
            whatsappWindow.close();
          }
        }, 5000);
      } else {
        console.log("Appointment input canceled.");
      }
    } else {
      console.error(`Patient with ID ${id} not found.`);
    }
  };

  const activeItem = "Doctor";

  const setActiveItem = (itemName) => {
    console.log(`Setting active item to ${itemName}`);
  };

  const clearAllBadges = () => {
    // Clear messages from state and local storage
    setMessages({});
    localStorage.removeItem("messages");
  };

  const handleSearch = () => {
    setSearchInput(searchInput);
  };

  return (
    <div className="App">
      <Navbar activeItem={activeItem} setActiveItem={setActiveItem} />
      <div className="mx-3">
        <div className="patient-list">
          {patientCount === 0 ? (
            <h1 className="my-3">No patients available.</h1>
          ) : (
            <div>
              <h2 className="my-2">Patient List</h2>
              <div className="d-flex align-items-center">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by name"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <button
                  className="btn btn-primary mx-3"
                  onClick={handleSearch}
                >
                  Search
                </button>
                <button
                  className="btn btn-secondary mx-6 my-2"
                  onClick={clearAllBadges}
                >
                  Clear Appointment Timinings
                </button>
              </div>
              <div className="table-responsive">
                <table className="table table-light table-bordered table-hover">
                  <colgroup>
                    <col style={{ width: "120px" }} />
                    <col style={{ width: "120px" }} />
                    <col style={{ width: "120px" }} />
                    <col style={{ width: "300px" }} />
                    <col style={{ width: "120px" }} />
                    <col style={{ width: "120px" }} />
                    <col style={{ width: "120px" }} />
                    <col style={{ width: "250px" }} />
                  </colgroup>
                  <thead className="table-dark">
                    <tr>
                      <th>Name</th>
                      <th>Last Name</th>
                      <th>Date</th>
                      <th>Address</th>
                      <th>Mobile No</th>
                      <th>Package</th>
                      <th>PaymentMethod</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPatients.map((patient) => (
                      <tr key={patient.id}>
                        <td>{patient.name}</td>
                        <td>{patient.lastname}</td>
                        <td>{patient.date}</td>
                        <td>{patient.address}</td>
                        <td>{patient.mobile}</td>
                        <td>
                          {packages[patient.packageId]
                            ? `${packages[patient.packageId].timeperiod}, joint=${packages[patient.packageId].joint}, Amount=${packages[patient.packageId].amount}`
                            : "Unknown Package"}
                        </td>
                        <td>{patient.paymentMethod}</td>
                        <td>
                          <button
                            className="btn btn-warning position-relative"
                            onClick={() => handleAppoint(patient.id)}
                          >
                            Appoint
                            {messages[patient.id] && (
                              <span className="badge bg-secondary position-absolute top-0 start-100 translate-middle">
                                {messages[patient.id]}
                              </span>
                            )}
                          </button>
                          <button
                            className="btn btn-info mx-1"
                            onClick={() => handleEdit(patient.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(patient.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AllPatients;
