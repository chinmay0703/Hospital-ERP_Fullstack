import Navbar from "../components/Navbar";
import React, { useState } from 'react';
import 'boxicons/css/boxicons.min.css';
import "../routes/Login.css";
import Footer from "../components/Footer/Footer";
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import axios from "axios";


function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const Signupp = () => {
	navigate("/signup")
  }
  const SignIn = () => {

	const url = `http://localhost:8080/user/get?email=${email}&password=${password}`;
	axios
	  .get(url)
	  .then((response) => {
		console.log('Response from server:', response.data);
		const user = response.data;
		if (user) {
		  const userToken = `${user.email}jadhyghsjhjhasjdhasduhjcsnj`;
		  const UserId = user.eid;
		  const UserName = `Welcome: ${user.firstname}  `;
		  localStorage.setItem('authToken', userToken);
		  localStorage.setItem('UserId', UserId);
		  localStorage.setItem('UserName', UserName);
		  navigate('/Enrollment');
		  toast.success('Logged in successfully');
		} else {
		  toast.error('Invalid email or password');
		}
	  })
	  .catch((error) => {
		console.error('Error:', error);
		toast.error('An error occurred while logging in');
	  });
  };
  

  return (
    <div className="App">
      <Navbar activeItem="Login" setActiveItem={() => {}} />
      <div className="containerr ">
        <div className="screen ">
          <div className="screen__content">
		  {/* eslint-disable-next-line  */}
            <form className="login" action="javascript:void(0)" method="get">
              <div className="login__field">
                <i className="login__icon fas fa-user"></i>
                <input type="text" className="login__input" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-lock"></i>
                <input type="password" className="login__input" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
              </div>
              <button className="button login__submit" onClick={SignIn}>
                <span className="button__text">Log In Now</span>
                <i className="button__icon fas fa-chevron-right"></i>
              </button>
              <button className="button login__submit" onClick={Signupp}>
                <span className="button__text">Signup Now</span>
                <i className="button__icon fas fa-chevron-right"></i>
              </button>
            </form>
          </div>
          <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4"></span>
            <span className="screen__background__shape screen__background__shape3"></span>
            <span className="screen__background__shape screen__background__shape2"></span>
            <span className="screen__background__shape screen__background__shape1"></span>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Login;
