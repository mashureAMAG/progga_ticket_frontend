import LoginContext from "@/context/loginContext";
import { useState, useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';
export default function MyApp({ Component, pageProps }) {

    const [loggedIn, setIsLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)
    const [token, setToken] = useState(null)

    useEffect(() => {
        const localStorageToken = localStorage.getItem('token')
        if (localStorageToken) {
            setIsLoggedIn(true)
            setToken(localStorageToken)
        }
        setLoading(false)
    }, [])



    return (
        <LoginContext.Provider value={{ loggedIn, setIsLoggedIn, loading, token }}>
            <Component {...pageProps} />
        </LoginContext.Provider>
    )
}
