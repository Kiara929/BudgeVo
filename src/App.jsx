import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./web-pages/HomePage";
import Login from "./web-pages/Login";
// import 'index.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;