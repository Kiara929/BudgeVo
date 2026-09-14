import "../css/Pop-Up-Menu.css"
import { useState, useEffect } from "react";
import PopUpMenuCategory from "./Pop-Up-Menu-Category";

function PopUpMenu({ type, onClose }) {

    const [transactionData, setTransactionData] = useState(null);
    const [transactionCategoryData, setTransactionCategoryData] = useState(null);
    const [showCategoryMenu, setShowCategoryMenu] = useState(false);



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



    return (
        <>
            <div className="popup-overlay">
                <div className="popup-menu">
                    <div className="popup-menu-content">
                        <h2>Add {type}</h2>
                        <form>
                            {transactionData?.map((field) => (
                                <div key={field.field}>
                                    <label>{field.name}</label>

                                    {field.name === "Category" ? (
                                        <>
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
<button type="button" onClick={() => setShowCategoryMenu(true)} > Add Category </button>                                        </>

                                    ) : (
                                        <>
                                            <input
                                                type={field.type}
                                                name={field.field}
                                            />
                                        </>
                                    )}

                                </div>
                            ))}
                            {/* <input type="text" placeholder={`${type} Name`} />
                        <input type="number" placeholder="Amount" />
                        <button type="submit">Add</button> */}
                        </form>
                        {showCategoryMenu && (
                            <PopUpMenuCategory
                                type="Category"
                                onClose={() => setShowCategoryMenu(false)}
                            />
                        )}
                        <button className="close-button" onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default PopUpMenu;

