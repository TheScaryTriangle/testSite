import React from "react";
import { Route, Routes } from "react-router-dom";

import Dashboard from "../screens/Dashboard/Dashboard";
import Header from "../screens/Dashboard/Header"

const DashboardRoute = () => {
    return (
        <div>
            <div className="w-[85%]">
                <Header/>
                <Routes>
                    <Route path="/Dashboard" element={<Dashboard />} />
                    {/* Add a wildcard route for unmatched paths */}
                    <Route path="*" element={<Dashboard />} />
                </Routes>
            </div>
        </div>
    );
};

export default DashboardRoute;