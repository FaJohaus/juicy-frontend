import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Insights from "./pages/Insights";
import Automation from "./pages/Automation";
import Settings from "./pages/Settings";

const WithNavbar = () => (
    <>
        <Navbar>
            <Outlet />
        </Navbar>
    </>
);

const Navigator = () => (
    <Routes>
        {/* ROUTES WITH NAVBAR */}
        <Route element={<WithNavbar />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/automation" element={<Automation />} />
            <Route path="/settings" element={<Settings />} />
        </Route>
        {/* ROUTES WITHOUT NAVBAR */}
        <Route element={<Outlet />}>
            <Route path="teapot" element={<div>I'm a teapot</div>} />
        </Route>
    </Routes>
);

export default Navigator;