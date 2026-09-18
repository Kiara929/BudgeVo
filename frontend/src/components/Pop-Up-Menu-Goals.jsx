import { useState, useEffect } from "react";
import "../css/Pop-Up-Menu.css";

function PopUpMenuGoals({ type, onClose }) {

    const [goal_name, setGoalName] = useState("");
    const [goal_type, setGoalType] = useState("");
    const [goalHeadings, setGoalHeadings] = useState([]);

    const getCookie = (name) => {
        const value = document.cookie
            .split("; ")
            .find((row) => row.startsWith(`${name}=`))
            ?.split("=")[1];

        return value ? decodeURIComponent(value) : null;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const payload = Object.fromEntries(formData.entries());
        console.log("formData:", payload);

        try {

            // 1. Get CSRF cookie from Laravel
            await fetch(
                "http://localhost:8000/sanctum/csrf-cookie",
                {
                    method: "GET",
                    credentials: "include",
                }
            );


            // 2. Get CSRF token
            const csrfToken = getCookie("XSRF-TOKEN");


            // 3. Create category
            const response = await fetch(
                "http://localhost:8000/api/goals/create",
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "X-XSRF-TOKEN": csrfToken,
                    },
                    body: JSON.stringify({
                        ...payload
                    }),
                }
            );

            const responseData = await response.json();

            // 4. Check for errors
            if (!response.ok) {
                console.error(responseData);
                return;
            }

            console.log(responseData);

            // Category was successfully created
            onClose();

        } catch (error) {

            console.error("Error:", error);

        }
    };

    useEffect(() => {
        const getGoalsHeadings = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/goals/heading", {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Accept": "application/json",
                    },
                });

                const data = await response.json();

                console.log(data);

                if (response.ok) {
                    setGoalHeadings(data);
                }
            } catch (error) {
                console.error("Error getting goal headings:", error);
            }
        };

        getGoalsHeadings();
    }, []);

    return (
        <div className="popup-overlay">

            <div className="popup-menu">
                <img src="reject.png" className="exit-hamburger-menu" onClick={onClose} />


                <div className="popup-menu-content">
                    <h2>Add {type}</h2>
                    <form onSubmit={handleSubmit}>
                        {goalHeadings.map((field) => (
                            <div key={field.field} className="popup-menu-inputs">
                                {field.type === "select" ? (
                                    <>
                                        <div className="popup-menu-category-inputs popup-menu-main">
                                            <select name={field.field}>
                                                {field.name === "Type" ? (
                                                    <>
                                                        <option value="">Select type</option>
                                                        <option value="Long Term">Long Term</option>
                                                        <option value="Short Term">Short Term</option>
                                                    </>
                                                ) : (
                                                    <>
                                                        <option value="">Select status</option>
                                                        <option value="Active">Active</option>
                                                        <option value="Completed">Completed</option>
                                                        <option value="Paused">Paused</option>
                                                    </>
                                                )}
                                            </select>

                                        </div>
                                    </>
                                ) : (
                                    <input type={field.type} name={field.field} placeholder={field.name} />
                                )}
                            </div>


                        ))}

                        <button type="submit" className="add-expense-button">Add {type}</button>
                    </form>
                </div>

            </div>

        </div>
    );
}

export default PopUpMenuGoals;