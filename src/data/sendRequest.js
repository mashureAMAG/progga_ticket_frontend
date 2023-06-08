"use client"
import axios from "axios";
import { useContext } from "react";
import { BASE_URL_DEV } from "@/config/apiConfig";
import LoginContext from "@/context/loginContext";

export const sendRequest = async (authenticated, url, method, data) => {
    const token = localStorage.getItem('token')
    const axiosConfig = {
        url: `${BASE_URL_DEV}${url}`,
        method
    }

    if (method === 'post') {
        axiosConfig['data'] = data
    }
    if (authenticated && token) {
        axiosConfig['headers'] = {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios(axiosConfig)

    console.log(response)

    return response
}