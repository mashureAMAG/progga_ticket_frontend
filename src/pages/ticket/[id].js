"use client"
import LoginContext from "@/context/loginContext";
import { useContext, useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import { sendRequest } from "@/data/sendRequest";


export default function TicketDetail() {
    const router = useRouter()
    const { loggedIn, setIsLoggedIn, loading } = useContext(LoginContext)
    const [ticket, setTicket] = useState(null)
    const [apiDataLoading, setApiDataLoading] = useState(true)

    useEffect(() => {
        if (!loading && !loggedIn) {
            router.push('/')
        }
        if (router.query.id) {
            loggedIn && sendRequest(true, `/api/ticket-detail/${router.query.id}`, 'get').then(response => { setTicket(response.data); setApiDataLoading(false) })
        }
    }, [loading, loggedIn, router])

    return (
        <div>
            {loggedIn && apiDataLoading && <div> Please wait we are fetching your tickets </div>}
            {loggedIn && !apiDataLoading && ticket && <div> {ticket.name} valid till {ticket.validity} </div>}
            <ToastContainer />
        </div>

    )
}