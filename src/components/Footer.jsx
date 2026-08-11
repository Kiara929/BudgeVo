import "../css/Footer.css";
import { useState, useEffect } from "react";

function Footer () {

    const [width, setWidth] = useState(window.innerWidth);
    
    const isMobile = width <= 768;
    
      useEffect(() => {
        const handleResize = () => {
          setWidth(window.innerWidth);
        };
    
        window.addEventListener("resize", handleResize);
    
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);

    return (
        <>

            <footer className="footer">
                <div className="footer-section">
                    <img src="BudgeVo-Favicon.png" alt="BudgeVo Logo" className="footer-logo" />
                    <h3 className="footer-title">BudgeVo</h3>
                </div>
                <div className="footer-section">
                    <h3>Information</h3>
                    <ul>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/contact-us">Contact Us</a></li>
                        <li><a href="">How It Works</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Our Services</h3>
                    <ul>
                        <li><a href="">Dashboard</a></li>
                        <li><a href="">Workspace</a></li>
                        <li><a href="">Projects</a></li>
                    </ul>
                </div>
                {isMobile ? (
                    <>
                    <div className="footer-section contact">
                    <h3>Contact Us</h3>
                    <ul>
                        <li>
                            <a href="">
                                <img src="home-white.png" alt="Location" className="footer-icon" />
                            Saint James, Barbados
                            </a>
                        </li>
                        <li>
                            <a href="mailto:info@budgevo.com">
                            <img src="email-white.png" alt="Email" className="footer-icon" />
                            info@budgevo.com
                            </a>
                        </li>
                        <li>
                            <a href="tel:+12460000000">
                                <img src="telephone-white.png" alt="Phone" className="footer-icon" />
                            +1 (246) 000-0000
                            </a>
                        </li>
                    </ul>
                    </div>
                    <div className="social-media-container">
                        <a href="" target="_blank" rel="noopener noreferrer">
                                <img src="facebook-white.png" alt="Facebook" />
                            </a>
                            <a href="" target="_blank" rel="noopener noreferrer">
                                <img src="instagram-white.png" alt="Instagram" />
                            </a>
                            <a href="" target="_blank" rel="noopener noreferrer">
                                <img src="x-(twitter)-white.png" alt="X" />
                            </a>
                    </div>
                    
                    </>
                ) : (
                    <>
                        <div className="footer-section contact">
                    <h3>Contact Us</h3>
                    <ul>
                        <li>
                            <a href="">
                                <img src="home-white.png" alt="Location" className="footer-icon" />
                            Saint James, Barbados
                            </a>
                        </li>
                        <li>
                            <a href="mailto:info@budgevo.com">
                            <img src="email-white.png" alt="Email" className="footer-icon" />
                            info@budgevo.com
                            </a>
                        </li>
                        <li>
                            <a href="tel:+12460000000">
                                <img src="telephone-white.png" alt="Phone" className="footer-icon" />
                            +1 (246) 000-0000
                            </a>
                        </li>
                    </ul>
                    <div className="social-media-container">
                        <a href="" target="_blank" rel="noopener noreferrer">
                                <img src="facebook-white.png" alt="Facebook" />
                            </a>
                            <a href="" target="_blank" rel="noopener noreferrer">
                                <img src="instagram-white.png" alt="Instagram" />
                            </a>
                            <a href="" target="_blank" rel="noopener noreferrer">
                                <img src="x-(twitter)-white.png" alt="X" />
                            </a>
                    </div>
                    </div>
                    </>
                )}
                

                    {/* {isMobile ? (
                        // </div>
                        <div className="social-icons">
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                                <img src="facebook-icon.png" alt="Facebook" />
                            </a>
                        </div>
                    ) : (
                        <div className="social-icons">
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                                <img src="facebook-icon.png" alt="Facebook" />
                            </a>
                        </div>
                    )} */}
                {/* </div> */}
            </footer>
        </>
    );
}

export default Footer;