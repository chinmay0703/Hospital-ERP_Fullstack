import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../Footer/Footer.css"
import 'boxicons/css/boxicons.min.css';
function Footer() {

    return (
        <div>



            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="footer-col col-4">
                            <h4>Timing</h4>
                            <ul>
                                <li><a href="/e">Monday to Saturday<br></br>
Morning - 9:30 to 12:30<br></br>
Evening - 5:30 to 8:30</a></li>
                               
                            </ul>
                        </div>
                       
                        <div className="footer-col col-4">
                            <h4>Address</h4>
                            <ul>
                                <li><a href="/q">Physical Therapy Clinic in Bangalore,
610, 2nd floor, AECS Layout - C Block, AECS Layout, Brookefield, Bengaluru, Karnataka 560037</a></li>
                               
                            </ul>
                        </div>
                        <div className="footer-col col-4">
                            <h4>follow us</h4>
                            <div className="social-links">
                                <a href="/d"><i className="bx bxl-facebook"></i></a>
                                <a href="/d"><i className="bx bxl-twitter"></i></a>
                                <a href="/e"><i className="bx bxl-instagram"></i></a>
                                <a href="/w"><i className="bx bxl-linkedin"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>



        </div>
    )
}

export default Footer;
