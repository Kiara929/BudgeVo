import { HashRouter, Routes, Route } from "react-router-dom";import HomePage from "./web-pages/HomePage";
import Login from "./web-pages/Login";
import Workspace from "./web-pages/Workspace";
// import 'index.css'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/workspace" element={<Workspace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;