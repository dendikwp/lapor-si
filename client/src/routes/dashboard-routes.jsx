import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MasterSI from '../pages/masterSI'
import Report from '../pages/report'
import MasterSkala from '../pages/skala'
import MasterServer from '../pages/server'

export default function DashboardRoutes() {
    return (
        <Routes>
            <Route path="/home" exact element={<Report />} />
            <Route path="/master-si" exact element={<MasterSI />} />
            <Route path="/master-skala" exact element={<MasterSkala />}/>
            <Route path="/master-server" exact element={<MasterServer />}/>
        </Routes>
    )
}