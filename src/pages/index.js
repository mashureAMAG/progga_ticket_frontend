"use client"
import TicketList from '@/components/TicketList'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL_DEV } from '@/config/apiConfig'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation'
import LoginContext from '@/context/loginContext'
import { Trocchi } from 'next/font/google'
import { sendRequest } from '@/data/sendRequest'


export default function Home() {
    const router = useRouter()
    const { loggedIn, setIsLoggedIn, loading } = useContext(LoginContext)

    const [token, setToken] = useState()
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')


    async function handleLogin() {
        try {
            const response = await sendRequest(false, '/api/token/', 'post', { username: name, password })
            const token = response.data.access
            localStorage.setItem('token', token)
            // setToken(token)
            setIsLoggedIn(true)

            router.push('/tickets')
        } catch (e) {
            toast.error('Login failed. Try again')
            console.log(e)
        }
    }
    return (
        <div>
            {!loggedIn && !loading && (
                <><input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="name" /><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" /><button onClick={handleLogin}>Login</button></>
            )}
            {loggedIn && !loading && (<div> Welcome Home </div>)}
            <ToastContainer />
        </div>

    )
}