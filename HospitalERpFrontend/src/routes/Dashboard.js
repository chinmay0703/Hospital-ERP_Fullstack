import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer/Footer";
import "../routes/Home.css";
import pic from "../Images/360_F_133334155_X23HzbJKawbIgXVaub4bPM8CjpkS5uMS.jpg";
import { Link } from "react-router-dom";
import "./Dashboard.css"
function Dashboard() {
  const activeItem = "Enrollment";
  const setActiveItem = (itemName) => {
    console.log(`Setting active item to ${itemName}`);
  };

  const backgroundImageStyle = {
    backgroundImage: `url(${pic})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100vh", // Set the height to 100% of the viewport height
    opacity: 0.7, // Set the opacity to reduce the image's intensity
    position: "relative", // Position property to contain the buttons
  };

  const buttonContainerStyle = {
    position: "absolute",
    top: "50%",
    left: "30%",
    textAlign: "center",
  };


  return (
    <div className="App">
      <Navbar activeItem={activeItem} setActiveItem={setActiveItem} />
      <div style={backgroundImageStyle}>
        <div style={buttonContainerStyle}>
         <Link to="/patient"> <button className="btn btn-primary w-100">Add Patient</button></Link>
         <Link to="/doctor"> <button className="btn btn-warning my-3 w-100">Add Doctor</button></Link>
        
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
