import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer/Footer";
import { BsPerson, BsWallet } from 'react-icons/bs';
import "./DashboardDetails.css"
function DashboardDetails() {
  const activeItem = "DashboardDetails";
  const setActiveItem = (itemName) => {
    console.log(`Setting active item to ${itemName}`);
  };

  const [patients, setPatients] = useState([]);
  const [packages, setPackages] = useState([]);
  const [patientCount, setPatientCount] = useState(0);
  const [totalPackageAmount, setTotalPackageAmount] = useState(0);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [filteredPatients, setFilteredPatients] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/patient/get")
      .then((response) => {
        setPatients(response.data);
      })
      .catch((error) => {
        console.error("Error fetching patient data:", error);
      });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8080/package/get")
      .then((response) => {
        setPackages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching package (Packagerate) data:", error);
      });
  }, []);

  const calculateTotalPackageAndPatients = () => {
    const filtered = patients.filter((patient) => {
      const patientDate = new Date(patient.date);
      return (
        patientDate.getFullYear() === selectedYear &&
        patientDate.getMonth() + 1 === selectedMonth
      );
    });

    const totalAmount = filtered.reduce((acc, patient) => {
      return acc + getAmountForPackage(patient.packageId);
    }, 0);

    setPatientCount(filtered.length);
    setTotalPackageAmount(totalAmount);
    setFilteredPatients(filtered);
  };

  useEffect(() => {
    calculateTotalPackageAndPatients();
  }, [patients, selectedYear, selectedMonth]);

  const getAmountForPackage = (packageId) => {
    const packageIdNumber = parseFloat(packageId);
    let packageAmount = 0;
    for (const packageItem of packages) {
      if (packageItem.id === packageIdNumber) {
        packageAmount += parseFloat(packageItem.amount);
      }
    }
    return packageAmount;
  };

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value));
  };

  return (
    <div className="App">
      <Navbar activeItem={activeItem} setActiveItem={setActiveItem} />
      <div className="container my-3">
        <div className="row">
          <div className="col-md-3 my-3">
            <label htmlFor="year" className="form-label"><b>Select Year</b></label>
            <select
              id="year"
              name="year"
              value={selectedYear}
              onChange={handleYearChange}
              className="form-select"
            >
              {Array.from({ length: 5 }, (_, i) => {
                const year = new Date().getFullYear() - i;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-md-3 my-3">
            <label htmlFor="month" className="form-label"><b>Select Month</b></label>
            <select
              id="month"
              name="month"
              value={selectedMonth}
              onChange={handleMonthChange}
              className="form-select"
            >
              {Array.from({ length: 12 }, (_, i) => {
                const month = i + 1;
                return (
                  <option key={month} value={month}>
                    {new Date(selectedYear, i).toLocaleString("default", { month: "long" })}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        {patientCount === 0 ? (
          <h3 className="text-black my-4">There are no patients for the selected date.</h3>
        ) : (
          <div className="row">
            <div className="col-md-4 mx-1">
              <div className="card shadow border-0" style={{ backgroundColor: 'pink' }}>
                <div className="card-body">
                  <BsPerson className="card-icon" size={35} style={{ color: 'black' }} />
                  <h5 className="card-title text-black"><b>Total Patients</b></h5>
                  <p className="card-text text-black">Total number of patients: {patientCount}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-lg border-0" style={{ backgroundColor: 'skyblue' }}>
                <div className="card-body">
                  <BsWallet className="card-icon" size={35} style={{ color: 'black' }} />
                  <h5 className="card-title text-black"><b>Total Amount</b></h5>
                  <p className="card-text text-black">Total amount: {totalPackageAmount}</p>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="my-4 mx-3 ">
                <h3 className="my-3">Patients for {new Date(selectedYear, selectedMonth - 1).toLocaleString("default", { month: "long" })} {selectedYear}</h3>
              </div>
              {filteredPatients.map((patient) => (
                <div className="col-md-4 my-3" key={patient.id}>
                  <div className="card shadow border-0"
                    style={{
                      backgroundColor: 'lightgreen',
                      transition: 'background-color 0.3s, box-shadow 0.3s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'lightyellow'; 
                      e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'lightgreen'; 
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div className="card-body">
                      <BsPerson className="card-icon" size={35} style={{ color: 'black' }} />
                      <h5 className="card-title text-black"><b>{patient.name} {patient.lastname}</b></h5>
                      <p className="card-text text-black">Date: {new Date(patient.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default DashboardDetails;
