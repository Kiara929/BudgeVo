import SideBar from "../components/SideBar";
import { useState, useEffect } from "react";
import ProgressBar from "../components/Progress-Bar";
import PopUpMenuCategory from "../components/Pop-Up-Menu-Category";
import "../css/GoalsPage.css";
import { useLocation } from "react-router-dom";


function GoalsPage({ transactionHeadings, transactionCategories }) {

    const location = useLocation();

    const getProgressPercentage = (currentAmount, targetAmount) => {
        const current = Number(currentAmount);
        const target = Number(targetAmount);

        if (!Number.isFinite(current) || !Number.isFinite(target) || target <= 0) {
            return 0;
        }

        return Math.min((current / target) * 100, 100);
    };

    const [goalsData, setGoalsData] = useState([]);
    const [subgoalsData, setSubGoalsData] = useState(null);
    const [transactionData, setTransactionData] = useState(null);
    const [subgoalsHeadings, setSubGoalsHeadings] = useState([]);
    const goalCount = goalsData?.length || 0;
    const [showSubGoals, setShowSubGoals] = useState(false);

    const [showCategoryMenu, setShowCategoryMenu] = useState(false);

    const [selectedGoalId, setSelectedGoalId] = useState("");
    const [selectedSubGoalId, setSelectedSubGoalId] = useState("");
    const [selectedGoalSubgoals, setSelectedGoalSubgoals] = useState([]);
    const [error, setError] = useState("");

    const selectedGoal = goalsData?.find(
        (g) => g.goal_id === parseInt(selectedGoalId, 10)
    );
    const subGoalsForGoal = selectedGoalSubgoals;

    const handleGoalChange = async (e) => {
        const goalId = e.target.value;
        setSelectedGoalId(goalId);
        setSelectedSubGoalId(""); // reset sub-goal whenever the goal changes
        setSelectedGoalSubgoals([]);

        if (goalId) {
            const subgoals = await getSubGoalsData(goalId);
            setSelectedGoalSubgoals(subgoals);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!selectedGoalId) {
            setError("Select a goal.");
            return;
        }
        if (subGoalsForGoal.length > 0 && !selectedSubGoalId) {
            return;
        }

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        const selectedCategory = transactionCategories?.find(
            (c) => c.category_id === parseInt(data.category_id, 10)
        );
        data.type = selectedCategory?.category_type;

        if (subGoalsForGoal.length > 0) {
            data.goal_id = null;
            data.sub_goal_id = selectedSubGoalId;
        } else {
            data.goal_id = selectedGoalId;
            data.sub_goal_id = null;
        }

        try {
            await fetch("http://localhost:8000/sanctum/csrf-cookie", {
                method: "GET",
                credentials: "include",
            });

            // 2. Get CSRF token
            const csrfToken = getCookie("XSRF-TOKEN");

            const response = await fetch("http://localhost:8000/api/transactions/create", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "X-XSRF-TOKEN": csrfToken,
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                console.error(result);
                setError("Something went wrong adding the transaction.");
                return;
            }

            e.target.reset();
            setSelectedGoalId("");
            setSelectedSubGoalId("");
            console.log(result);
        } catch (err) {
            console.error("Error adding transaction:", err);
            setError("Something went wrong adding the transaction.");
        }
    };


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

    const getSubGoalsData = async (goalId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/goals/${goalId}/subgoals`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Accept": "application/json",
                },
            });

            const data = await response.json();

            console.log(data);

            if (response.ok) {
                const subgoals = Array.isArray(data) ? data : [];
                setSubGoalsData(subgoals.length > 0 ? subgoals : null);
                return subgoals;
            }
        } catch (error) {
            console.error("Error getting subgoals data:", error);
        }

        return [];
    };


    const getSubGoalsHeadings = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/goals/subgoals/heading`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Accept": "application/json",
                },
            });

            const data = await response.json();

            console.log(data);

            if (response.ok) {
                setSubGoalsHeadings(data);
            }
        } catch (error) {
            console.error("Error getting subgoals heading:", error);
        }
    };

    useEffect(() => {
        getSubGoalsHeadings();
    }, []);

    const getCookie = (name) => {
        const value = document.cookie
            .split("; ")
            .find((row) => row.startsWith(`${name}=`))
            ?.split("=")[1];

        return value ? decodeURIComponent(value) : null;
    };

    const handleSubGoalSubmit = async (e, goal) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            // 1. Get CSRF cookie from Laravel
            await fetch("http://localhost:8000/sanctum/csrf-cookie", {
                method: "GET",
                credentials: "include",
            });

            // 2. Get CSRF token
            const csrfToken = getCookie("XSRF-TOKEN");

            const response = await fetch(`http://localhost:8000/api/goals/${goal.goal_id}/subgoals/create`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "X-XSRF-TOKEN": csrfToken,

                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const error = await response.json();
                console.error("Error creating subgoal:", error);
                return;
            }

            await getSubGoalsData(goal.goal_id);
            e.currentTarget.reset();
        } catch (error) {
            console.error("Error creating subgoal:", error);
        }
    };

    const [width, setWidth] = useState(window.innerWidth);
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



    return (
        <>
            <div className={`workspace-container goals ${isMobile ? "is-mobile" : "is-desktop"}`}>
                <SideBar />

                <div className="workspace-main">
                    <div className="workspace-sections">
                        <div className="goals-main-heading">
                            {isDesktop ? (
                                <>
                                    <div className="goals-main-writing">
                                        <h1 >Goals</h1>
                                        <hr />

                                    </div>

                                    <div className="goals-page-heading">
                                                                                <p>A goal's total is what you type in — until it has sub-goals, and then the total is just the sum of theirs. Same for progress: it's read off whichever level actually holds the transactions.</p>

                                        <button>+ Add Goal</button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h1 >Goals</h1>
                                    <hr />
                                    <div className="goals-page-heading">

                                        <p>A goal's total is what you type in — until it has sub-goals, and then the total is just the sum of theirs. Same for progress: it's read off whichever level actually holds the transactions.</p>
                                        <button>+ Add Goal</button>
                                    </div>
                                </>
                            )}

                        </div>

                        <div className="goals-page-section">
                            <p className="goals-count-heading">{`${goalCount} goal${goalCount > 1 ? 's' : ''}`}</p>
                            {goalsData ? (
                                <>
                                    {goalsData.map((goal => (
                                        isDesktop ? (
                                            <>
                                            <div className="goal-item">
                                                <div className="goal-item-heading">
                                                     <h3>{goal.goal_name}</h3>
                                            <p>${goal.current_amount} of ${goal.target_amount}</p>
                                                </div>
                                           

                                            <ProgressBar progress={getProgressPercentage(goal.current_amount, goal.target_amount)} />
                                        </div>

                                            </>
                                        ):(
                                        <>
                                        <div className="goal-item">
                                            <h3>{goal.goal_name}</h3>
                                            <p>${goal.current_amount} of ${goal.target_amount}</p>

                                            <ProgressBar progress={getProgressPercentage(goal.current_amount, goal.target_amount)} />
                                        </div>

                                        </>)
                                        
                                    )))}
                                </>
                            ) : (
                                <>
                                    <p>Please create a goal.</p>
                                </>
                            )}

                        </div>
                        <div className="goal-subgoal-section">
                            {goalsData.length > 0 ?
                                (
                                    <>
                                        {goalsData.map((goal => (
                                            <div className="goal-subgoal-item">
                                                <div className="subgoal-heading">
                                                    <h2>{goal.goal_name}</h2>
                                                    <img
                                                        src="arrow.png"
                                                        className={`dropdown-arrow-goals ${showSubGoals ? "active" : ""}`}
                                                        style={{ rotate: "90deg" }}
                                                        onClick={() => {
                                                            const isOpening = !showSubGoals;
                                                            setShowSubGoals(isOpening);

                                                            if (isOpening) {
                                                                getSubGoalsData(goal.goal_id);
                                                            }
                                                        }}
                                                    />
                                                </div>


                                                {showSubGoals && (
                                                    <>
                                                        <div className="subgoals-section">
                                                            <p>{goal.status}</p>
                                                            <div className="subgoal-goal-section">
                                                                <div className="goal-data">
                                                                    <h2>${goal.current_amount}</h2>
                                                                    <p>of ${goal.target_amount}</p>
                                                                </div>
                                                                <p>Current is the sum of transactions logged directly to this goal.</p>
                                                                <ProgressBar progress={getProgressPercentage(goal.current_amount, goal.target_amount)} />
                                                            </div>
                                                            <div className="subgoal-sub-section">
                                                                <h3>Sub-goals</h3>
                                                                {!subgoalsData ? (
                                                                    <p className="subgoal-add-heading">No sub-goals yet. This goal's target and progress come from its own transactions.</p>
                                                                ) : (
                                                                    <>
                                                                        <p>This goal's target and progress come from its accumulated sub-goal transactions.</p>

                                                                        {subgoalsData.map((subgoal => (
                                                                            <>
                                                                                <div className="subgoal-goal-section">
                                                                                    <div className="goal-data">
                                                                                        <h2>{subgoal.subgoal_name}</h2>
                                                                                        <p>${subgoal.current_amount} of ${subgoal.target_amount}</p>
                                                                                    </div>
                                                                                    <ProgressBar progress={getProgressPercentage(subgoal.current_amount, subgoal.target_amount)} />
                                                                                </div>
                                                                            </>
                                                                        )))}
                                                                    </>

                                                                )}

                                                                <form className="subgoal-add-form" onSubmit={(e) => handleSubGoalSubmit(e, goal)} >
                                                                    {subgoalsHeadings.map((heading => (
                                                                        <>
                                                                            {heading.type === "select" ? (
                                                                                <>
                                                                                    <div className="popup-menu-category-inputs popup-menu-main">
                                                                                        <select name={heading.field} type={heading.type}>
                                                                                            <option>Active</option>
                                                                                            <option>Completed</option>
                                                                                            <option>Paused</option>

                                                                                        </select>
                                                                                    </div>


                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    <input name={heading.field} placeholder={heading.name} type={heading.type} />

                                                                                </>
                                                                            )}
                                                                        </>
                                                                    )))}
                                                                    {/* <input type="text" placeholder="Sub-Goal Name" />
                                                                <input type="number" placeholder="Target Amount" /> */}
                                                                    <button type="submit">+ Add sub-goal</button>
                                                                </form>
                                                            </div>

                                                            <div className="subgoal-sub-section">
                                                                <h3>Transactions</h3>
                                                                {!transactionData?.length ? (
                                                                    <p className="subgoal-add-heading">No transactions logged.</p>
                                                                ) : (
                                                                    <>
                                                                        <p>This goal's target and progress come from its accumulated sub-goal transactions.</p>

                                                                        {transactionData.map((transaction => (
                                                                            <>
                                                                                <div className="subgoal-goal-section transaction">
                                                                                    <div className="goal-data transaction">
                                                                                        <div className="transaction-goal-heading">
                                                                                            <h2>{transaction.category?.category_name ?? "Uncategorized"}</h2>
                                                                                            <h3>{transaction.sub_goal?.subgoal_name ?? "Goal transaction"}</h3>
                                                                                        </div>

                                                                                        <div className="transaction-goal-data">
                                                                                            <p>${transaction.amount}</p>

                                                                                            <p>{transaction.transaction_date}</p>
                                                                                            {/* <p>{transaction.description}</p> */}
                                                                                        </div>

                                                                                    </div>
                                                                                </div>
                                                                            </>
                                                                        )))}

                                                                    </>

                                                                )}

                                                                <form className="subgoal-add-form" onSubmit={handleSubmit}>
                                                                    {transactionHeadings.map((heading => (
                                                                        <>
                                                                            {heading.type === "select" ? (
                                                                                <>
                                                                                    <div className="popup-menu-category-inputs popup-menu-main">
                                                                                        {heading.name === "Category" ? (
                                                                                            <>
                                                                                                <select name={heading.field} type={heading.type}>

                                                                                                    {transactionCategories?.map((category => (
                                                                                                        <>
                                                                                                            <option
                                                                                                                key={category.category_id}
                                                                                                                value={category.category_id}
                                                                                                            >
                                                                                                                {category.category_name}
                                                                                                            </option>
                                                                                                        </>
                                                                                                    )))}
                                                                                                </select>

                                                                                            </>

                                                                                        ) : (
                                                                                            <>
                                                                                                {error && <p className="form-error">{error}</p>}

                                                                                                <select value={selectedGoalId} onChange={handleGoalChange} required>
                                                                                                    <option value="" disabled>Select a goal</option>
                                                                                                    {goalsData?.map((goal) => (
                                                                                                        <option key={goal.goal_id} value={goal.goal_id}>
                                                                                                            {goal.goal_name}
                                                                                                        </option>
                                                                                                    ))}
                                                                                                </select>

                                                                                                {selectedGoal && subGoalsForGoal.length > 0 && (
                                                                                                    <select
                                                                                                        value={selectedSubGoalId}
                                                                                                        onChange={(e) => setSelectedSubGoalId(e.target.value)}
                                                                                                        required
                                                                                                    >
                                                                                                        <option value="" disabled>Select a sub-goal</option>
                                                                                                        {subGoalsForGoal.map((sg) => (
                                                                                                            <option key={sg.subgoal_id} value={sg.subgoal_id}>
                                                                                                                {sg.subgoal_name}
                                                                                                            </option>
                                                                                                        ))}
                                                                                                    </select>
                                                                                                )}

                                                                                            </>
                                                                                        )}



                                                                                        {heading.name === "Category" && (
                                                                                            <button type="button" onClick={() => setShowCategoryMenu(true)} className="add-buttons"> Add Category </button>

                                                                                        )}

                                                                                    </div>

                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    <input name={heading.field} placeholder={heading.name} type={heading.type} />

                                                                                </>
                                                                            )}
                                                                        </>
                                                                    )))}
                                                                    {/* <input type="text" placeholder="Sub-Goal Name" />
                                                                <input type="number" placeholder="Target Amount" /> */}
                                                                    <button type="submit">+ Add transaction</button>
                                                                </form>
                                                                {showCategoryMenu && (
                                                                    <PopUpMenuCategory
                                                                        type="Category"
                                                                        onClose={() => setShowCategoryMenu(false)}
                                                                    />
                                                                )}
                                                            </div>
                                                        </div>
                                                    </>
                                                )}

                                            </div>

                                        )))}
                                    </>
                                ) : (
                                    <>
                                        <p>Please create a goal.</p>
                                    </>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GoalsPage;