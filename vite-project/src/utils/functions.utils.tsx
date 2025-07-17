import React, {SetStateAction} from "react";
import apiClient from "../services/apiClient.tsx";
import {toast} from "react-toastify";

export const formatedNumber = (s: number | undefined) => {
    if (s === undefined) return '';
    return s.toLocaleString('vi-VN');
}

export const formatedDate = (s: string | undefined) => {
    if (!s) return '';
    return new Date(s).toLocaleString('vi-VN', {
        timeZone: 'Asia/Ho_Chi_Minh', // Đảm bảo đúng múi giờ VN
        hour12: false, // 24h format
    });
}


export const fetchData = async (
    url: string,
    isClient: boolean,
    setData?: React.Dispatch<SetStateAction<any>>,
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

export const fetchDataWithQuery = async (
    url: string,
    setData: React.Dispatch<SetStateAction<any>>,
    page: number,
    limit: number | 10) => {
    try {
        const response = await apiClient.get(url, {
            params: {
                page: page,
                limit: limit
            }
        });
        if (response.status === 200) {
            console.log(response.data)
            setData(response.data)
        } else
            toast.error('Failed to get products')
    } catch (e) {
        console.error(e)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        toast.error(e.message)
    }
}

export const postData = async (url: string) => {
    try {
        const response = await apiClient.post(url);
        if (response.status === 200) {
            console.log(response.data)
        } else {
            toast.error('Failed')
        }
    } catch (e) {
        console.error(e)
        toast.error('Failed')
    }
}