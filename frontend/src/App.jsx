import { HashRouter, Routes, Route } from "react-router-dom";import HomePage from "./web-pages/HomePage";
import Login from "./web-pages/Login";
import Workspace from "./web-pages/Workspace";
import GoalsPage from "./web-pages/Goals";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

import { useEffect, useState } from "react";
// import 'index.css'



function App() {

  const [transactionData, setTransactionData] = useState([]);
      const [transactionCategoryData, setTransactionCategoryData] = useState(null);


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
    <AuthProvider>
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login isLogin={true} />} />
        <Route path="/signup" element={<Login isLogin={false} />} />
        <Route path="/workspace" element={ <ProtectedRoute><Workspace /></ProtectedRoute> } />
        <Route path="/goals" element={ <ProtectedRoute><GoalsPage transactionHeadings ={transactionData} transactionCategories={transactionCategoryData} /></ProtectedRoute> } />
      </Routes>
    </HashRouter>
    </AuthProvider>
  );
}

export default App;