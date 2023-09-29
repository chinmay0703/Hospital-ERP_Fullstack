import Navbar from "../components/Navbar";
import React, { useState } from 'react';
import 'boxicons/css/boxicons.min.css';
import "../routes/Login.css"
import Footer from "../components/Footer/Footer";
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
import axios from "axios";

function Signup() {
    const activeItem = "Signup";
    const setActiveItem = (itemName) => {
        console.log(`Setting active item to ${itemName}`);
    };
    const navigate = useNavigate()
    const SignUp = () => {
        const body = {
            firstname, lastname, email, password
        }
        axios.post('http://localhost:8080/user/save', body)
            .then(response => {
                console.log('Response from server:', response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        navigate("/login");
        toast.success("Signup Successfully")
    };
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div className="App">
            <Navbar activeItem={activeItem} setActiveItem={setActiveItem} />
            <div className="containerr ">
                <div className="screen ">
                    <div className="screen__content">
                        <form className="login ">
                            <div className="login__field">
                                <input type="text" className="login__input my-2" required onChange={e => (
                                    setFirstname(e.target.value)
                                )} placeholder="Firstname" />
                                <input type="text" className="login__input my-2" required onChange={e => (
                                    setLastname(e.target.value)
                                )} placeholder="Lastname" />

                                <input type="email" className="login__input my-2" required onChange={e => (
                                    setEmail(e.target.value)
                                )} placeholder="Email" />

                                <input type="password" className="login__input my-2" required onChange={e => (
                                    setPassword(e.target.value)
                                )} placeholder="Password" />
                            </div>
                            <button className="button login__submit" onClick={SignUp}>
                                <span className="button__text"  >Signup Now</span>
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
export default Signup;
