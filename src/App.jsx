import { HashRouter, Routes, Route } from "react-router-dom";import HomePage from "./web-pages/HomePage";
import Login from "./web-pages/Login";
// import 'index.css'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </HashRouter>
  );
}

export default App;