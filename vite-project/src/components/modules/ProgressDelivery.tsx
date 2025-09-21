import {useEffect, useState} from "react";
import {orderLogType} from "../../utils/user.data-types.tsx";
import {fetchDataWithQuery} from "../../utils/functions.utils.tsx";
import endpoints from "../../services/endpoints.tsx";

const ProgressDelivery = (order_id: string) => {
    const [data, setData] = useState<orderLogType[]>([])

    useEffect(() => {
        fetchDataWithQuery(endpoints.user.getOrderLog, setData, {"order_id": order_id}, 1, 10)
    }, [])

    useEffect(() => {
        console.log(data)
    }, [data]);

    return (
        <div></div>
    )
}
export default ProgressDelivery