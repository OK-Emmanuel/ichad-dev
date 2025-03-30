import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineChart = ({ data, xKey, yKey, color }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map(d => d[xKey]),
        datasets: [
          {
            label: 'Value',
            data: data.map(d => d[yKey]),
            borderColor: color,
            backgroundColor: color + '20',
            fill: true,
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, xKey, yKey, color]);

  return <canvas ref={chartRef} />;
};

export default LineChart; 