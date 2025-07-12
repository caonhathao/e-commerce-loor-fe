import React, {SetStateAction} from "react";
import apiClient from "../services/apiClient.tsx";
import {toast} from "react-toastify";

export const formatedNumber = (s: number | undefined) => {
    if (s === undefined) return '';
    return s.toLocaleString('vi-VN');
}

export const formateDate = (s: string | undefined) => {
    if (s === undefined) return '';
    return new Date(s).toLocaleDateString('vi-VN');
}

export const fetchData = async (
    url: string,
    isClient: boolean,
    setData: React.Dispatch<SetStateAction<any>>,
    messageErr?: string,
    messageSuccess?: string
) => {
    try {
        let response;
        if (isClient) {
            response = await apiClient.get(url);
            if (response && response.status === 200) {
                if (messageSuccess?.length !== 0) toast.success(messageSuccess)
                setData(response.data)
            } else toast.error(messageErr ?? 'Error')
        } else {
            response = await fetch(url)
            if (response && response.status === 200) {
                if (messageSuccess?.length !== 0) toast.success(messageSuccess)
                const data = await response.json();
                setData(data)
            } else toast.error(messageErr ?? 'Error')
        }
    } catch (e) {
        console.error(e)
        toast.error(messageErr ?? 'Error')
    }
}