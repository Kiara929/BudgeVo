import "../css/NavBar.css";
import { useState, useEffect, useRef } from "react";

function NavBar() {
  const [width, setWidth] = useState(window.innerWidth);
  const [menuOpen, setMenuOpen] = useState(false);

  const [visibleLinks, setVisibleLinks] = useState([]);
  const [overflowLinks, setOverflowLinks] = useState([]);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navLinksRef = useRef(null);
  const itemRefs = useRef([]);

  const links = [
    { label: "Home", href: "/", image: "/home.png" },
    { label: "Workspace", href: "/workspace", image: "/briefcase.png" },
    { label: "Dashboard", href: "/dashboard", image: "uptrend.png" },
    { label: "About Us", href: "/about", image: "users.png" },
    { label: "Contact Us", href: "/contact", image: "mail.png" },
  ];

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

  const calculateNavigation = () => {
    // measure against the real nav-links container, not the whole navbar
    if (!navLinksRef.current) return;

    const availableWidth = navLinksRef.current.clientWidth;

    let usedWidth = 0;

    const visible = [];
    const overflow = [];

    const moreButtonSpace = 60;

    links.forEach((link, index) => {
      const item = itemRefs.current[index];

      if (!item) return;

      const itemWidth = item.offsetWidth + 30;

      if (usedWidth + itemWidth <= availableWidth - moreButtonSpace) {
        visible.push(link);
        usedWidth += itemWidth;
      } else {
        overflow.push(link);
      }
    });

    setVisibleLinks(visible);
    setOverflowLinks(overflow);
  };

  useEffect(() => {
    // rAF instead of setTimeout(0) — ties recalculation to the next paint
    // instead of an arbitrary macrotask delay
    const raf = requestAnimationFrame(() => {
      calculateNavigation();
    });

    const observer = new ResizeObserver(() => {
      calculateNavigation();
    });

    if (navLinksRef.current) {
      observer.observe(navLinksRef.current);
    }

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [width]);

  return (
    <>
      {isMobile ? (
        <div className="nav-bar-container">
          <nav className="nav-bar">
            <div className="nav-bar-image">
              <a href="/index.html">
                <img
                  src="/BudgeVo-Logo.png"
                  alt="BudgeVo Logo"
                  className="home-logo"
                />
              </a>
            </div>

            {/* Hamburger Icon */}
            <img
              src="/more.png"
              className="hamburger-icon"
              alt="Open Menu"
              onClick={() => setMenuOpen(true)}
            />

            {/* Hamburger Menu */}

            <aside className={`nav-links-container ${menuOpen ? "open" : ""}`}>
              <div className="hamburger-icons">
                <a href="/">
                  <img
                    src="/BudgeVo-Logo.png"
                    className="hamburger-logo"
                    alt="BudgeVo Logo"
                  />
                </a>

                <img
                  src="/reject.png"
                  className="exit-hamburger-menu"
                  alt="Close Menu"
                  onClick={() => setMenuOpen(false)}
                />
              </div>

              <ul className="nav-links-mobile">
                {links.map((link) => (
                  <li key={link.label}>
                    <img className="nav-links-icons" src={link.image} />
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>

              <hr className="hamburger-menu-divider" />

              <div className="Log-In-Sign-In-mobile">
                <ul>
                  <li>
                    <img src="/user.png" className="nav-links-icons" alt="" />
                    <a href="">Log In</a>
                  </li>
                </ul>

                <button>Get Started</button>
              </div>
            </aside>
          </nav>
        </div>
      ) : (
        <div className="nav-bar-container">
          <nav className="nav-bar">
            <div className="nav-bar-image">
              <img src="/BudgeVo-Logo.png" alt="BudgeVo Logo" />
            </div>

            {/*
                        Hidden measuring list — always renders ALL links at
                        their natural (unwrapped) width so itemRefs reflect
                        true content width, regardless of what's currently
                        visible in the real nav below.
                    */}
            <ul className="nav-links measure-links">
              {links.map((link, index) => (
                <li
                  key={link.label}
                  ref={(el) => (itemRefs.current[index] = el)}
                >
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>

            <ul ref={navLinksRef} className="nav-links">
              {visibleLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}

              {overflowLinks.length > 0 && (
                <li className="more-dropdown">
                  <button
                    className="more-button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    ▼
                  </button>

                  <ul className={`dropdown-menu ${dropdownOpen ? "open" : ""}`}>
                    {overflowLinks.map(link => (
                        <li key={link.label}>
                            <a href={link.href}>{link.label}</a>
                        </li>
                    ))}
                </ul>
                  
                </li>
              )}
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
