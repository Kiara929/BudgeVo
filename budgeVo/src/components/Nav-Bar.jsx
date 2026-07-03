import "../css/NavBar.css"

function NavBar() {
    return (
        <>
            <div className="nav-bar-container">
                <nav className="nav-bar"> 
                    <div className="nav-bar-image">
                        <img src="/BudgeVo-Logo.png" />
                        {/* <h2>BudgeVo</h2> */}
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
        </>
    )
}

export default NavBar;