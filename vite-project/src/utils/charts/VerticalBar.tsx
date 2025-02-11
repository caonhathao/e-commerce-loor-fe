import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Bar} from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const VerticalBarChart = ({
                       titleChart,
                       labelDataset,
                       labelsChart,
                       dataChart
                   }: { titleChart: string; labelDataset: string; labelsChart: string[]; dataChart: number[] }) => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: titleChart,
            }
        },
        scales: {
            y: {
                min: Math.min(...dataChart),
                max: Math.max(...dataChart) + 50,
                ticks:{
                    stepSize: 50,
                }
            }
        }
    }

    const labels = labelsChart;

    const data = {
        labels,
        datasets: [{
            label: labelDataset,
            data: dataChart,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
        ]
    }
    return <Bar options={options} data={data}/>
}
export default VerticalBarChart;