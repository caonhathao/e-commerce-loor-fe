import React, {SetStateAction} from "react";
import apiClient from "../services/apiClient.tsx";
import {toast} from "react-toastify";

export const formatedNumber = (s: number | undefined) => {
    if (s === undefined) return '';
    return s.toLocaleString('vi-VN');
}

export const formatedDate = (s: string | undefined, showTime: boolean = false) => {
    if (!s) return '';
    return new Date(s).toLocaleString('vi-VN', {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour12: false,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        ...(showTime
            ? {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            }
            : {}),
    });
};


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
                if (messageSuccess && messageSuccess?.length !== 0) toast.success(messageSuccess)
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                setData(response.data)
            } else if (messageErr && messageErr.length !== 0) toast.error(messageErr)
        } else {
            response = await fetch(url)
            if (response && response.status === 200) {
                // if (messageSuccess?.length !== 0) toast.success(messageSuccess)
                const data = await response.json();
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                setData(data)
            }
            // else toast.error(messageErr ?? 'Error')
        }
    } catch (e) {
        console.error(e)
    }
}

export const fetchDataWithPayload = async (
    url: string,
    setData?: React.Dispatch<SetStateAction<any>>,
    payload?: any,
    messageErr?: string,
    messageSuccess?: string
) => {
    try {
        const response = await apiClient.get(url, {
            params:
            payload
        });
        if (response && response.status === 200) {
            if (messageSuccess && messageSuccess?.length !== 0) toast.success(messageSuccess)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setData(response.data)
        } else if (messageErr && messageErr.length !== 0) toast.error(messageErr)
    } catch (e) {
        console.error(e)
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
            setData(response.data)
        } else if (response.status === 201) {
            setData(undefined)
            toast.success(response.data.message)
        }
    } catch (e) {
        console.error(e)
        toast.error('Failed')
    }
}

export const postData = async (url: string, values: any, setData?: React.Dispatch<SetStateAction<any>>) => {
    try {
        const response = await apiClient.post(url, values);
        if (response.status === 200) {
            setData?.(response.data)
        } else {
            toast.error('Failed')
        }
    } catch (e) {
        console.error(e)
        toast.error('Failed')
    }
}

export const deleteData = async (url: string, values?: any) => {
    try {
        const response = await apiClient.delete(url, {data: values});
        if (response.status !== 200) {
            console.error(response.data.message)
        } else toast.success('Xóa thành công')
    } catch (e) {
        console.error(e)
        toast.error('Failed')
    }
}