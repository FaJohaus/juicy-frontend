import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Insights from "./pages/Insights";
import Automation from "./pages/Automation";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import { useUser } from "./context/UserContext";
import Signup from "./pages/Signup";

const WithNavbar = () => (
    <Navbar>
        <Outlet />
    </Navbar>
);

const PrivateRoute = () => {
    const { user } = useUser();

    return user ? <Outlet /> : <Navigate to="/login" />;
};

const Navigator = () => (
    <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* PRIVATE ROUTES */}
        <Route element={<PrivateRoute />}>
            {/* ROUTES WITH NAVBAR */}
            <Route element={<WithNavbar />}>
                <Route path="/" element={<Navigate to="/dashboard/0" />} />
                <Route path="/dashboard/:id" element={<Dashboard />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/automation" element={<Automation />} />
                <Route path="/settings" element={<Settings />} />
            </Route>
            {/* ROUTES WITHOUT NAVBAR */}
        </Route>
    </Routes>
);

export default Navigator;