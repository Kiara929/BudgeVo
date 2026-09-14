import { useState } from "react";
import "../css/Pop-Up-Menu.css";

function PopUpMenuCategory({ type, onClose }) {

    const [category_name, setCategoryName] = useState("");
    const [category_type, setCategoryType] = useState("");

    const getCookie = (name) => {
        const value = document.cookie
            .split("; ")
            .find((row) => row.startsWith(`${name}=`))
            ?.split("=")[1];

        return value ? decodeURIComponent(value) : null;
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

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
                "http://localhost:8000/api/transactions/categories/create",
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "X-XSRF-TOKEN": csrfToken,
                    },
                    body: JSON.stringify({
                        category_name,
                        category_type,
                    }),
                }
            );


            const data = await response.json();


            // 4. Check for errors
            if (!response.ok) {
                console.error(data);
                return;
            }


            console.log(data);

            // Category was successfully created
            onClose();

        } catch (error) {

            console.error("Error:", error);

        }
    };


    return (
        <div className="popup-overlay">

            <div className="popup-menu">

                <div className="popup-menu-content">

                    <h2>Add {type}</h2>

                    <form onSubmit={handleSubmit}>

                        <input
                            type="text"
                            placeholder="Category Name"
                            name="category_name"
                            value={category_name}
                            onChange={(e) =>
                                setCategoryName(e.target.value)
                            }
                        />

                        <select
                            name="category_type"
                            value={category_type}
                            onChange={(e) =>
                                setCategoryType(e.target.value)
                            }
                        >
                            <option value="">
                                Select Type
                            </option>

                            <option value="Expense">
                                Expense
                            </option>

                            <option value="Income">
                                Income
                            </option>
                        </select>

                        <button type="submit">
                            Create Category
                        </button>

                    </form>

                    <button
                        className="close-button"
                        onClick={onClose}
                    >
                        Close
                    </button>

                </div>

            </div>

        </div>
    );
}

export default PopUpMenuCategory;