import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import { useLogin } from '../../services/auth'
import { getTokenFromCookie } from '../../utils/setToken'

export default function Login() {
    const [isAuth, setIsAuth] = useState(false)

    let token = getTokenFromCookie()

    const { login, loading } = useLogin()

    const [form, setForm] = useState({
        username: "",
        password: ""
    })

    const handleInput = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const HandleLogin = (e) => {
        e.preventDefault()
        login(form)
    }

    useEffect(() => {
        if (token != null) {
            setIsAuth(true)
            window.location.replace('/home')
        }
    }, [token])

    return (
        <Fragment>
            {isAuth ? null :
                <div className="bg-gradient-primary" style={{height: '100vh'}}>
                    <div className="col-lg-12 login-wrapper">
                        <div className="card-login shadow-lg">
                            <div className="p-5">
                                <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-4">LAPOR SI</h1>
                                </div>
                                <form className="user" onSubmit={HandleLogin}>
                                    <div className="form-group">
                                        <input type="text" name='username' className="form-control form-control-user" placeholder="username"
                                            required
                                            value={form.username}
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" name='password' className="form-control form-control-user" placeholder="password"
                                            required
                                            value={form.password}
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <button type='submit' className="btn btn-primary btn-user btn-block"
                                        disabled={loading}>
                                        {loading ? "Loading.." : "Masuk"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </Fragment>
    )
}
