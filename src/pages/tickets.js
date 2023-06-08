"use client"
import LoginContext from "@/context/loginContext";
import { useContext, useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import { sendRequest } from "@/data/sendRequest";
import Link from "next/link";

export default function Tickets() {
    const router = useRouter()
    const { loggedIn, setIsLoggedIn, loading } = useContext(LoginContext)
    const [tickets, setTickets] = useState(null)
    const [apiDataLoading, setApiDataLoading] = useState(true)

    useEffect(() => {
        if (!loading && !loggedIn) {
            router.push('/')
        }
        loggedIn && sendRequest(true, '/api/ticket-list/', 'get').then(response => { setTickets(response.data); setApiDataLoading(false) })
    }, [loading, loggedIn])

    return (
        <div>
            {loggedIn && apiDataLoading && <div> Please wait we are fetching your tickets </div>}
            {loggedIn && !apiDataLoading && tickets && <div> {tickets.map((ticket, index) => <li key={index}>{ticket.name} <p><Link href={`ticket/${ticket.id}`}>View</Link></p></li>)} </div>}
            <ToastContainer />
        </div>

    )
}