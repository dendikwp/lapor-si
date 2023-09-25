import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar({ isToggle }) {
    return (
        <ul className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${isToggle ? 'toggled' : ''}`} id="accordionSidebar">
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.php">
                <div className="sidebar-brand-text mx-3">LaporSI<sup /></div>
            </a>
            <hr className="sidebar-divider my-0" />
            <li className="nav-item">
                <Link className="nav-link" to="/home">
                    <i className="fa fa-book" aria-hidden="true" />&nbsp;&nbsp;<span>Home</span>
                </Link>
            </li>
            <hr className="sidebar-divider" />
            <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                    <i className="fas fa-fw fa-cog" />&nbsp;<span>Konfigurasi</span>
                </a>
                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <Link className="collapse-item" to="/master-si">Master SI</Link>
                        <Link className="collapse-item" to="/master-server">Master Server</Link>
                        <Link className="collapse-item" to="/master-skala">Master Skala</Link>
                        <Link className="collapse-item" to="/master-tim">Master Tim</Link>
                    </div>
                </div>
            </li>
        </ul>
    )
}
