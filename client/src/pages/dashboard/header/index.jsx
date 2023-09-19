import React from 'react'
import { decodeToken, deleteAllCookies } from '../../../utils/setToken'

export default function Header({ handleToggle }) {
    const logout = () => {
        deleteAllCookies()
        window.location.replace('/')
    }

    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <button className="btn btn-link rounded-circle mr-3" onClick={handleToggle}>
                <i className="fa fa-bars" />
            </button>
            <ul className="navbar-nav ml-auto">
                <div className="topbar-divider d-none d-sm-block" />
                <li className="nav-item dropdown no-arrow">
                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">{decodeToken().username}&nbsp;</span>
                        <img className="img-profile rounded-circle" src="undraw_profile.svg" />
                    </a>
                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                        <a className="dropdown-item" href="#" onClick={logout}>
                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                            Keluar
                        </a>
                    </div>
                </li>
            </ul>
        </nav>
    )
}
