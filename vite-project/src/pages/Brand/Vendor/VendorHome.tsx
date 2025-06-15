import LineChart from "../../../utils/charts/Line.tsx";
import DoughnutChart from "../../../utils/charts/Doughnut.tsx";
import VerticalBarChart from "../../../utils/charts/VerticalBar.tsx";

const VendorHome = () => {
    return (
        <div className={'w-max h-max flex flex-col justify-start items-center'}>
            <div className={'w-full h-full p-2 border-b-gray-400 border rounded-xl'}>
                <LineChart titleChart={'Doanh thu theo tuần'}
                           labelDataset={'đv: 000đ'}
                           labelsChart={['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']}
                           dataChart={[120, 1500, 2550, 340, 576, 3500, 4120]}/>
            </div>
            <div className={'w-full h-full p-2 my-2 border-b-gray-400 border rounded-xl'}>
                <DoughnutChart titleChart={'Tình trạng các đơn hàng'}
                               labelDataset={['Hoàn thành', 'Đang chờ', 'Đang chuyển', 'Bị hủy']}
                               dataChart={[12, 34, 19, 2]}
                />
            </div>
            <div className={'w-full h-full p-2 mb-20 border-b-gray-400 border rounded-xl'}>
                <VerticalBarChart titleChart={'Đánh giá cửa hàng'} labelDataset={'Tổng số sao'}
                                  labelsChart={['5', '4', '3', '2', '1']} dataChart={[59, 3, 4, 1, 1]}/>
            </div>
        </div>
    )
}
export default VendorHome