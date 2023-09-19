import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from '../pages/auth';
import Dashboard from '../pages/dashboard';

export default function MainRoute() {
    return (
        <Router>
            <Routes>
                <Route index exact element={<Login />} />
                <Route path="/*" element={<Dashboard />} />
            </Routes>
        </Router>
    )
}
