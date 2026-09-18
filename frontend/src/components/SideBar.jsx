import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SideBar({ userData }) {
    const [width, setWidth] = useState(window.innerWidth);
        const [menuOpen, setMenuOpen] = useState(false);
        // const [dropdownOpen, setDropdownOpen] = useState(false);
    
        const isMobile = width <= 768;
        const isDesktop = width >= 1100;
    
        useEffect(() => {
            const handleResize = () => {
                setWidth(window.innerWidth);
            };
    
            window.addEventListener("resize", handleResize);
    
            return () => {
                window.removeEventListener("resize", handleResize);
            };
        }, []);
    
        const links = [
        {
            label: "Workspace",
            href: "/workspace",
            image: `${import.meta.env.BASE_URL}home.png`,
        },
        {
            label: "Transactions",
            href: "/",
            image: `${import.meta.env.BASE_URL}briefcase.png`,
        },
        {
            label: "Income",
            href: "/",
            image: `${import.meta.env.BASE_URL}uptrend.png`,
        },
        {
            label: "Expenses",
            href: "/about",
            image: `${import.meta.env.BASE_URL}users.png`,
        },
        {
            label: "Goals",
            href: "/goals",
            image: `${import.meta.env.BASE_URL}mail.png`,
        },
        {
            label: "Savings",
            href: "/contact",
            image: `${import.meta.env.BASE_URL}mail.png`,
        },
        {
            label: "Budgets",
            href: "/contact",
            image: `${import.meta.env.BASE_URL}mail.png`,
        },
        {
            label: "Calendar",
            href: "/contact",
            image: `${import.meta.env.BASE_URL}mail.png`,
        },
        {
            label: "Settings",
            href: "/contact",
            image: `${import.meta.env.BASE_URL}mail.png`,
        },
    ];

    return (
        <>
            {isMobile ? (
                <>
                    <div className="workspace-banner-mobile">
                        <div className="workspace-banner-logo">
                            <img
                                src="more.png"
                                className="hamburger-icon"
                                alt="Open Menu"
                                onClick={() => setMenuOpen(true)}
                            />

                            {/* Mobile slide-in overlay menu */}
                            <aside className={`workspace-menu ${menuOpen ? "open" : ""}`}>
                                <div className="hamburger-icons">
                                    <a href="/">
                                        <img
                                            src={`${import.meta.env.BASE_URL}BudgeVo-Logo.png`}
                                            className="workspace-hamburger-icon"
                                            alt="BudgeVo Logo"
                                        />
                                    </a>

                                    <img
                                        src={`${import.meta.env.BASE_URL}reject.png`}
                                        className="exit-hamburger-menu-workspace"
                                        alt="Close Menu"
                                        onClick={() => setMenuOpen(false)}
                                    />
                                </div>

                                <div className="workspace-profile">
                                    <img src="woman.png" className="workspace-profile-icon" alt="" />
                                    <h3>Hi, {userData?.name}</h3>
                                </div>

                                <hr className="hamburger-menu-divider" />

                                <ul className="nav-links-mobile">
                                    {links.map((link) => (
                                        <li key={link.label}>
                                            <img className="nav-links-icons" src={link.image} alt="" />
                                            <Link to={link.href}>{link.label}</Link>
                                        </li>
                                    ))}
                                </ul>

                                <hr className="hamburger-menu-divider" />
                            </aside>
                        </div>

                        <div className="workspace-banner-header">
                            <input
                                type="text"
                                placeholder="Search transactions, goals..."
                                className="workspace-search-bar"
                            />
                            <img src="notification.png" className="workspace-notification-icon" alt="Notifications" />
                        </div>
                    </div>

                    {/* {pageContent} */}
                </>
            ) : (
                <>
                    {/* Desktop persistent sidebar */}
                    <aside className="workspace-sidebar">
                        <div className="workspace-banner-logo">
                            <a href="/" className="workspace-logo-header">
                                <img src="BudgeVo-Favicon.png" className="workspace-logo" alt="" />
                                <h1>
                                    Budge<span>Vo</span>
                                </h1>
                            </a>
                        </div>

                        <ul className="nav-links-mobile workspace-menu-container">
                            {links.map((link) => (
                                <li key={link.label}>
                                    <img className="nav-links-icons" src={link.image} alt="" />
                                    <Link to={link.href}>{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </aside>

                    {/* Desktop main column: header bar + page content */}

                </>
            )}
        </>
    )
}

export default SideBar;