import { HashRouter, Routes, Route } from "react-router-dom";import HomePage from "./web-pages/HomePage";
import Login from "./web-pages/Login";
import Workspace from "./web-pages/Workspace";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { useState } from "react";
// import 'index.css'



function App() {

  return (
    <AuthProvider>
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login isLogin={true} />} />
        <Route path="/signup" element={<Login isLogin={false} />} />
        <Route path="/workspace" element={ <ProtectedRoute><Workspace /></ProtectedRoute> } />
      </Routes>
    </HashRouter>
    </AuthProvider>
  );
}

export default App;