import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Line } from 'react-chartjs-2';
import { Chart ,LinearScale } from 'chart.js';
import { useState, useEffect } from 'react';



const ChartComponent = () => {
    useEffect(() => {
        // Register the linear scale
        Chart.register(LinearScale);
      }, []);
    const chartData = {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      datasets: [
        {
          label: 'Traffic',
          data: [2112, 2343, 2545, 3423, 2365, 1985, 987],
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };
  
    return <Bar data={chartData} options={chartOptions} />;
  };

  

  export default ChartComponent;