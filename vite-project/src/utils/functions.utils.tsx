import React, {SetStateAction} from "react";
import apiClient from "../services/apiClient.tsx";
import {toast} from "react-toastify";
import CryptoJS from 'crypto-js';

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

export const encrypt = (str: string) => {
    return CryptoJS.SHA256(str).toString(CryptoJS.enc.Hex);
}

export const fetchData = async (
    url: string,
    isReturn: boolean = false,
    setData?: React.Dispatch<SetStateAction<any>>,
    messageErr?: string,
    messageSuccess?: string
) => {
    try {
        const response = await apiClient.get(url);
        if (response && response.status === 200) {
            if (messageSuccess && messageSuccess?.length !== 0) toast.success(messageSuccess)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            if (!isReturn) setData(response.data)
            else return response.data
        } else if (messageErr && messageErr.length !== 0) toast.error(messageErr)

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
    values?: Record<string, string>,
    page?: number,
    limit?: number | 10
) => {
    try {
        const response = await apiClient.get(url, {
            params: {
                ...values,
                page: page,
                limit: limit
            }
        });
        if (response.status === 200) {
            setData(response.data)
        } else if (response.status === 201) {
            setData(undefined)
        }
    } catch (e) {
        console.error(e)
        toast.error('Failed')
    }
}

export const postData = async (url: string, isReturn: boolean = false, values?: any, setData?: React.Dispatch<SetStateAction<any>>) => {
    try {
        const response = await apiClient.post(url, values);
        if (response.status === 200) {
            if (isReturn) return response.data
            else setData?.(response.data)
        } else if (response.status === 201) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setData(undefined)
        } else {
            toast.warning('Không tìm được thông báo', {autoClose: 1000})
        }
    } catch (e) {
        console.error(e)
        toast.error('Failed')
    }
}

export const putData = async (url: string, isReturn: boolean = false, values?: any, setData?: React.Dispatch<SetStateAction<any>>) => {
    try {
        const response = await apiClient.put(url, values);
        if (response.status === 200) {
            if (isReturn) return response
            else {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                setData(response.data)
            }
        } else console.error(response.data.message)
    } catch (e) {
        console.error(e)
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