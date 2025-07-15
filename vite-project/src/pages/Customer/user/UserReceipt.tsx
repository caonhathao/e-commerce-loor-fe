import {fetchData} from "../../../utils/functions.utils.tsx";
import endpoints from "../../../services/endpoints.tsx";
import {useEffect, useState} from "react";

const UserReceipt = () => {
    const [orderData, setOrderData] = useState([])

    useEffect(() => {
        fetchData(endpoints.user.getOrders, true, setOrderData, 'Lấy dữ liệu thất bại')
    }, [])

    useEffect(() => {
        console.log(orderData)

    }, [orderData]);

    return (
        <div></div>
    )
}

export default UserReceipt