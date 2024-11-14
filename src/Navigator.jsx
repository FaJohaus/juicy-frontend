import React from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./Pages/Dashboard";
import Visuals from "./Pages/Visuals";
import Automation from "./Pages/Automation";
import Settings from "./Pages/Settings";

const Navigator = () => (
    <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/visuals" element={<Visuals />} />
        <Route path="/automation" element={<Automation />} />
        <Route path="/settings" element={<Settings />} />
    </Routes>
);

export default Navigator;