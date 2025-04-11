import { Routes, Route } from "react-router-dom";
import Dashboard from "../features/dashboard/Dashboard";
import Login from "../features/login/Login";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />}/>
            <Route path="/login" element={<Login />}/>
        </Routes>
    )
}