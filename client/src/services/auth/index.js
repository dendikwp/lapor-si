import { useState } from 'react';
import axios from '../API';
import swal from 'sweetalert'
import { setTokenInCookie } from '../../utils/setToken';

export const useLogin = () => {
    const [loading, setLoading] = useState(false)

    const login = async (payload) => {
        setLoading(true)
        try {
            const res = await axios.post("login", payload);
            setTokenInCookie(res.data.token);
            setLoading(false);
            window.location.replace("/home");
        } catch (error) {
            setLoading(false)
            swal({
                title: "Login Failed",
                text: "menutup jendela...",
                icon: "warning",
                timer: 3000,
                buttons: false,
            })
        }
    };

    return { login, loading };
};