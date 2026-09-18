import { useState, useEffect } from "react";
import "../css/Workspace.css";
import { Link } from "react-router-dom";
import DashboardCard from "../components/Dashboard-Card";
import Calendar from "../components/Calendar";
import ProgressBar from "../components/Progress-Bar";
import PopUpMenu from "../components/Pop-Up-Menu";
import SideBar from "../components/SideBar";

function Workspace() {

        const [userData, setUserData] = useState(null);
        const [showExpenseMenu, setShowExpenseMenu] = useState(false);
        const [transactionData, setTransactionData] = useState([]);

    
    useEffect(() => {
    const getUser = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/user", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Accept": "application/json",
                },
            });

            const data = await response.json();

            console.log(data);

            if (response.ok) {
                setUserData(data);
            }
        } catch (error) {
            console.error("Error getting user:", error);
        }
    };

    getUser();
}, []);

useEffect(() => {
        const getTransactionData = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/transactions", {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Accept": "application/json",
                    },
                });

                const data = await response.json();

                console.log(data);

                if (response.ok) {
                    setTransactionData(data);
                }
            } catch (error) {
                console.error("Error getting goals data:", error);
            }
        };

        getTransactionData();
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
            href: "/contact",
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

    const dashboardCardData = [
        {image: `${import.meta.env.BASE_URL}income.png`, heading: "Total Income", value: 4250.00, percentage: 12},
        {image: `${import.meta.env.BASE_URL}reduce-cost.png`, heading: "Total Expenses", value: 2350.75, percentage: 8},
        {image: `${import.meta.env.BASE_URL}target-black.png`, heading: "Goal Progress", value: "68%", percentage: 5},
        {image: `${import.meta.env.BASE_URL}piggy-bank.png`, heading: "Savings Rate", value: "32%", percentage: 4},
    ]

    const longTermGoals = [
        { id: 1, title: "Buy a House", targetAmount: 200000, savedAmount: 50000, percentage: 75 },
        { id: 2, title: "Start a Business", targetAmount: 100000, savedAmount: 25000, percentage: 25 },
    ];

    // const expenseItems = [
    //     { id: 1, description: "Groceries", category: "One Time", amount: 150.75, date: "2026-09-02" },
    //     { id: 2, description: "Utilities", category: "Recurring", amount: 80.50, date: "2026-09-03" },
    //     { id: 3, description: "Gym Membership", category: "Long term", amount: 45.00, date: "2026-09-05" },
    //     { id: 4, description: "Car Insurance", category: "Short term", amount: 120.00, date: "2026-09-07" },
    // ];

    const date = new Date();

    const [width, setWidth] = useState(window.innerWidth);
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

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

    // Shared page content — rendered inside .workspace-main on desktop,
    // and directly inside .workspace-container on mobile.
    // const pageContent = (

    // );

    

    return (
        <div className={`workspace-container ${isMobile ? "is-mobile" : "is-desktop"}`}>
            <SideBar userData={userData} />

            <div className="workspace-main">
                { }
                {/* <div className="workspace-banner-header">
                            <input
                                type="text"
                                placeholder="Search transactions, goals..."
                                className="workspace-search-bar"
                            />
                            <img src="notification.png" className="workspace-notification-icon" alt="Notifications" />
                        </div> */}
                

                <div className="workspace-sections">
                    {!isMobile && (
                    <>
                        <div className="workspace-banner-header">
                            <input
                                type="text"
                                placeholder="Search transactions, goals..."
                                className="workspace-search-bar"
                            />
                            <img src="notification.png" className="workspace-notification-icon" alt="Notifications" />
                            <div className="workspace-profile">
                                <img src="woman.png" className="workspace-profile-icon" alt="" />
                            </div>
                            <h3>Hi, {userData?.name}</h3>
                        </div>
                    </>
                )}
                    
                    {/* <div className="workspace-banner-date">
                        <div className="workspace-month">
                            <img
                                src="arrow.png"
                                style={{ transform: "rotate(180deg)" }}
                                className="workspace-month-arrows"
                                alt="Previous month"
                            />
                            <h2>
                                {date.toLocaleString("en-US", { month: "long" })} {date.getFullYear()}
                            </h2>
                            <img src="arrow.png" className="workspace-month-arrows" alt="Next month" />
                        </div>

                        <div className="workspace-today-date">
                            <p>Today: {date.toDateString()} - 11 days remaining</p>
                        </div>
                    </div> */}

                    <div className="workspace-dashboard-section">
                        <div className="workspace-dashboard-heading">
                            <div className="workspace-dashboard-heading-words">
                                <h2>Dashboard snapshot</h2>
                                {/* <p>Income, spend, and goal trends live on the full dashboard.</p> */}
                            </div>
                            <button className="workspace-dashboard-button">Open dashboard <img src="right-arrow.png" className="workspace-right-arrow"/></button>
                        </div>
                        <div className="dashboard-cards-container">
                                {dashboardCardData.map((cardData) => {
                                return (                                
                                <DashboardCard dashboard_card_data= {cardData}/>
                                )
                            })}
                            </div>
                    </div>

                    <div className="workspace-calendar-goals-section">
                        <div className="calendar-section">
                            <div className="workspace-calendar-heading">
                                {/* <h2>{date.toLocaleString("en-US", { month: "long" })} calendar</h2> */}
                                <div className="calendar-legends">
                                    <p>
                                        <div className="calendar-legend green"></div>
                                        Income
                                    </p>
                                    <p>
                                        <div className="calendar-legend red"></div>
                                        Expense
                                    </p>
                                </div>
                            </div>
                            <Calendar />
                        </div>
                        <div className="goals-section">
                            <div className="workspace-goals-heading">
                                <h2>Long Term Goals</h2>
                                <a href="#" className="view-all-link">
                                    View all
                                </a>
                            </div>
                            <div className="workspace-goals-section">
                                {longTermGoals.map((goal) => (
                                    <div key={goal.id} className="workspace-goal-card">
                                        <div className="goal-card-heading">
                                            <h3>{goal.title}</h3>
                                            <p>{goal.percentage}%</p>
                                        </div>
                                        
                                        {/* <p>Target: ${goal.targetAmount.toLocaleString()}</p>
                                        <p>Saved: ${goal.savedAmount.toLocaleString()}</p> */}
                                        <ProgressBar progress={parseFloat(goal.percentage)} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="workspace-actions">
                        <button className="workspace-action-button"> +  Add Income</button>
                        <button className="workspace-action-button"     onClick={() => setShowExpenseMenu(true)}> +  Add Expense</button>
                        <button className="workspace-action-button"> <img src="pencil.png" alt="Edit" className="workspace-action-icon" /> Edit Budget</button>
                        <button className="workspace-action-button"> <img src="bullseye.png" alt="Manage Goals" className="workspace-action-icon" /> Manage Goals</button>

                        {showExpenseMenu && (
                            <PopUpMenu
                                type="Expense"
                                onClose={() => setShowExpenseMenu(false)}
                            />
                        )}
                    </div>
                    <div className="workspace-transactions-section">
                        <div className="workspace-transactions-heading">
                            <h2>This month's expenses</h2>
                            <a href="#" className="view-all-link">
                                View all
                            </a>
                        </div>
                        <div className="workspace-transactions-filters">
                            {/* <select> */}
                                <button className="workspace-filter-button">All</button>
                                <button className="workspace-filter-button">Recurring</button>
                                <button className="workspace-filter-button">Long term</button>
                                <button className="workspace-filter-button">Short term</button>
                                <button className="workspace-filter-button">One-time</button>
                            {/* </select> */}
                        </div>
                        <div className="workspace-expenses-list">

    {isDesktop ? (
        <table className="workspace-expenses-table">
            {/* <thead>
                <tr>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Actions</th>
                </tr>
            </thead> */}

            <tbody>
                {transactionData.map((transaction) => (
                    <tr key={transaction.transaction_id} className="workspace-expense-item">
                        <td className="expense-item-description"><h3>{transaction.category.category_name}</h3></td>
                        <td className="expense-item-category" style={{color: "green"}}>{transaction.category.category_type}</td>
                        <td>
                            {new Date(transaction.created_at).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric"
                            })}
                        </td>
                        {/* <td className="expense-item-empty"></td>
                        <td className="empty"></td> */}

                        <td className="expense-item-value" style={{color: "red"}}>-${transaction.amount}</td>
                        <td className="expense-item-actions">
                            <img
                                src="pencil-black.png"
                                alt="Edit"
                                className="workspace-expense-icon"
                            />
                        {/* </td>
                        <td> */}

                            <img
                                src="trash-can.png"
                                alt="Delete"
                                className="workspace-expense-icon"
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    ) : (
        transactionData.map((transaction) => (
            <div
                key={transaction.transaction_id}
                className="workspace-expense-item"
            >
                <div className="expense-item-description">
                    <h3>{transaction.category.category_name}</h3>

                    <div className="expense-item-category">
                        <p>{transaction.category.category_type}</p>
                    </div>

                    <p>
                        {new Date(transaction.created_at).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric"
                        })}
                    </p>
                </div>

                <div className="expense-item-amount-icons">
                    <h3>-${transaction.amount}</h3>

                    <img
                        src="pencil-black.png"
                        alt="Edit"
                        className="workspace-expense-icon"
                    />

                    <img
                        src="trash-can.png"
                        alt="Delete"
                        className="workspace-expense-icon"
                    />
                </div>
            </div>
        ))
    )}

</div>
                    </div>
                    <div>
                        <ul>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Workspace;