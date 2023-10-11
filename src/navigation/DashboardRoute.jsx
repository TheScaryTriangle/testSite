import React from "react";
import { Link, Route, Routes } from "react-router-dom";

import Dashboard from "../screens/Dashboard/Dashboard";
import Voting from "../screens/Dashboard/Voting";
import VotingSelection from "../screens/Dashboard/VoteSelection";

import Header from "../screens/Dashboard/Header";

const DashboardRoute = () => {
    return (
        <div className="flex">
            {/* Sidebar on the left */}
            <div className="w-[15%] bg-gray-300 p-4">
                <ul>
                    <li>
                        <Link to="/Dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/Voting">Vote</Link>
                    </li>
                </ul>
            </div>

            {/* Main Content on the right */}
            <div className="w-[85%] p-4">
                <Header />
                <Routes>
                    <Route path="/Dashboard" element={<Dashboard />} />
                    <Route path="/Voting" element={<Voting />} />
                    <Route path="/VotingSelection" element={<VotingSelection />} />
                    {/* Add a wildcard route for unmatched paths */}
                    <Route path="*" element={<Dashboard />} />
                </Routes>
            </div>
        </div>
    );
};

export default DashboardRoute;
