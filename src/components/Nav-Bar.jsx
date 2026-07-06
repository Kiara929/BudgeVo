import "../css/NavBar.css";
import { useState } from "react";

function NavBar() {
    const isMobile = window.innerWidth <= 768;
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            {isMobile ? (
                <div className="nav-bar-container">
                    <nav className="nav-bar">
                        <div className="nav-bar-image">
                            <img src="/BudgeVo-Logo.png" alt="BudgeVo Logo" />
                        </div>

                        {/* Hamburger Icon */}
                        <img
                            src="/more.png"
                            className="hamburger-icon"
                            alt="Open Menu"
                            onClick={() => setMenuOpen(true)}
                        />

                        {/* Hamburger Menu */}
                        {menuOpen && (
                            <div className="nav-links-container">
                                <div className="hamburger-icons">
                                    <img
                                        src="/BudgeVo-Logo.png"
                                        className="hamburger-logo"
                                        alt="BudgeVo Logo"
                                    />

                                    <img
                                        src="/reject.png"
                                        className="exit-hamburger-menu"
                                        alt="Close Menu"
                                        onClick={() => setMenuOpen(false)}
                                    />
                                </div>

                                <ul className="nav-links-mobile">
                                    <li>
                                        <img src="/home.png" className="nav-links-icons" alt="" />
                                        <a href="">Home</a>
                                    </li>

                                    <li>
                                        <img src="/briefcase.png" className="nav-links-icons" alt="" />
                                        <a href="">Workspace</a>
                                    </li>

                                    <li>
                                        <img src="/signal-bars.png" className="nav-links-icons" alt="" />
                                        <a href="">Dashboard</a>
                                    </li>

                                    <li>
                                        <img src="/users.png" className="nav-links-icons" alt="" />
                                        <a href="">About Us</a>
                                    </li>

                                    <li>
                                        <img src="/mail.png" className="nav-links-icons" alt="" />
                                        <a href="">Contact Us</a>
                                    </li>
                                </ul>

                                <hr className="hamburger-menu-divider" />

                                <div className="Log-In-Sign-In-mobile">
                                    <li>
                                        <img src="/user.png" className="nav-links-icons" alt="" />
                                        <a href="">Log In</a>
                                    </li>

                                    <button>Get Started</button>
                                </div>
                            </div>
                        )}
                    </nav>
                </div>
            ) : (
                <div className="nav-bar-container">
                    <nav className="nav-bar">
                        <div className="nav-bar-image">
                            <img src="/BudgeVo-Logo.png" alt="BudgeVo Logo" />
                        </div>

                        <ul className="nav-links">
                            <li><a href="">Home</a></li>
                            <li><a href="">Workspace</a></li>
                            <li><a href="">Dashboard</a></li>
                            <li><a href="">About Us</a></li>
                            <li><a href="">Contact Us</a></li>
                        </ul>

                        <div className="Log-In-Sign-In">
                            <li>Log In</li>
                            <button>Get Started</button>
                        </div>
                    </nav>
                </div>
            )}
        </>
    );
}

export default NavBar;