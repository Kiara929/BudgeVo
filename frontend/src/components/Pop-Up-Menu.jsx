import "../css/Pop-Up-Menu.css"
import { useState, useEffect } from "react";
import PopUpMenuCategory from "./Pop-Up-Menu-Category";
import PopUpMenuGoals from "./Pop-Up-Menu-Goals";
import { Link } from "react-router-dom";

function PopUpMenu({ type, onClose }) {

    const [transactionData, setTransactionData] = useState(null);
    const [goalsData, setGoalsData] = useState(null);
    const [transactionCategoryData, setTransactionCategoryData] = useState(null);
    const [showCategoryMenu, setShowCategoryMenu] = useState(false);
    const [showGoalsMenu, setShowGoalsMenu] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);



    useEffect(() => {
        const getTransactionData = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/transactions/heading", {
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
                console.error("Error getting transaction data:", error);
            }
        };

        getTransactionData();
    }, []);


    useEffect(() => {
        const getTransactionCategoryData = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/transactions/categories", {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Accept": "application/json",
                    },
                });

                const data = await response.json();

                console.log(data);

                if (response.ok) {
                    setTransactionCategoryData(data);
                }
            } catch (error) {
                console.error("Error getting transaction data:", error);
            }
        };

        getTransactionCategoryData();
    }, []);


    useEffect(() => {
        const getGoalsData = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/goals", {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Accept": "application/json",
                    },
                });

                const data = await response.json();

                console.log(data);

                if (response.ok) {
                    setGoalsData(data);
                }
            } catch (error) {
                console.error("Error getting goals data:", error);
            }
        };

        getGoalsData();
    }, []);



    return (
        <>
            <div className="popup-overlay">
                <div className="popup-menu">
                    <img src="reject.png" className="exit-hamburger-menu" onClick={onClose} />
                    <div className="popup-menu-content">
                        <h2>Add {type}</h2>
                        <form>
                            {transactionData?.map((field) => (
                                <div key={field.field} className="popup-menu-inputs">
                                    {/* <label>{field.name}</label> */}

                                    {field.name === "Category" ? (
                                        <>
                                            <div className="popup-menu-category-inputs popup-menu-main">
                                                <select name={field.field}>
                                                    {!transactionCategoryData ||
                                                        transactionCategoryData.length === 0 ? (
                                                        <option value="">
                                                            Please create a category
                                                        </option>
                                                    ) : (
                                                        transactionCategoryData.map((category) => (
                                                            <option
                                                                key={category.category_id}
                                                                value={category.category_id}
                                                            >
                                                                {category.category_name}
                                                            </option>
                                                        ))
                                                    )}
                                                </select>
                                                <button type="button" className="add-category-button" onClick={() => setShowCategoryMenu(true)} > Add Category </button>
                                            </div>
                                        </>

                                    ) : field.name === "Goal" ? (
                                        <>
                                            <div className="popup-menu-category-inputs popup-menu-main">
                                                <select
                                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                                >
                                                    <option name="">Is this {type} a part of a goal/project?</option>

                                                    {!goalsData ? (
                                                        <>
                                                            <option>Please add a goal</option>
                                                            <option value={"No"} name="goal-no">No</option>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <option value={"Yes"} name="goal-yes">Yes</option>
                                                            <option value={"No"} name="goal-no">No</option>
                                                        </>
                                                    )}

                                                </select>

                                                {(selectedCategory === "Yes" && goalsData) && (
                                                    <>
                                                        <div className="popup-menu-category-inputs popup-menu-main">
                                                            <select
                                                                type={field.type}
                                                                name={field.field}
                                                                placeholder={field.name}
                                                            >
                                                                {goalsData.map((goal => (
                                                                    <>
                                                                        <option value={goal.goal_id}>{goal.goal_name}</option>
                                                                    </>
                                                                )))}
                                                                {/* <option>House</option> */}
                                                            </select>
                                                        </div>
                                                    </>
                                                )}

                                                {goalsData && (
                                                    <>
                                                        {/* <button type="button" onClick={() => setShowGoalsMenu(true)} > Add Goal </button> */}
                                                        <button><Link to="/goals">Add Goal</Link></button>
                                                    </>
                                                )}
                                            </div>



                                        </>
                                    ) : (
                                        <>
                                            <input
                                                type={field.type}
                                                name={field.field}
                                                placeholder={field.name}
                                            />
                                        </>
                                    )}

                                </div>
                            ))}
                            {/* <input type="text" placeholder={`${type} Name`} />
                        <input type="number" placeholder="Amount" /> */}
                            <button type="submit" className="add-expense-button">Add {type}</button>
                        </form>
                        {showCategoryMenu && (
                            <PopUpMenuCategory
                                type="Category"
                                onClose={() => setShowCategoryMenu(false)}
                            />
                        )}

                        {/* {showGoalsMenu && (
                            <PopUpMenuGoals
                                type="Goals"
                                onClose={() => setShowGoalsMenu(false)}
                            />
                        )} */}
                    </div>
                </div>
            </div>

        </>
    )
}

export default PopUpMenu;

