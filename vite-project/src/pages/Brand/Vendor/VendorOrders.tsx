const VendorOrders = () => {
    return (
        <div className={'w-80 h-screen flex flex-col justify-start items-center'}>
            <div className={'w-fit h-fit grid grid-cols-3 grid-rows-2 gap-4 text-black nb-2'}>
                <div className={'border border-gray-600 rounded-4xl text-center p-1'}>Tất cả</div>
                <div className={'border border-gray-600 rounded-4xl text-center p-1'}>Hoàn thành</div>
                <div className={'border border-gray-600 rounded-4xl text-center p-1'}>Chờ duyệt</div>
                <div className={'border border-gray-600 rounded-4xl text-center p-1'}>Đã duyệt</div>
                <div className={'border border-gray-600 rounded-4xl text-center p-1'}>Đã hủy</div>
                <div className={'border border-gray-600 rounded-4xl text-center p-1'}>Shipping</div>
            </div>
        </div>
    )
}
export default VendorOrders