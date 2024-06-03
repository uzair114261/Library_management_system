import React, { useEffect, useState } from 'react';
import { memo } from 'react';
import 'chart.js/auto';
import { Pie, Bar, Line, Doughnut } from 'react-chartjs-2';
import moment from 'moment';

const Analytics = () => {
  const [analytics, setAnalytics] = useState({
    books_by_category: null,
    total_books: null,
    total_loan: null,
    overdue_books: null,
    all_books: null,
    students: null
  });

  const fetchAnalyticsData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}analytics`);
      const data = await response.json();
      setAnalytics({
        books_by_category: data.books_by_category,
        total_books: data.total_books,
        total_loan: data.loans,
        all_books: data.books,
        students: data.students
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAnalyticsData();
  }, []);
  const categoryLabels = analytics.books_by_category ? Object.keys(analytics.books_by_category) : [];
  const categoryData = analytics.books_by_category ? Object.values(analytics.books_by_category) : [];

  const pieData = {
    labels: ["Book's Categories" ],
    datasets: [
      {
        label: 'Number of Loans',
        data: categoryData,
        backgroundColor: [
          '#d9f99d', '#67e8f9', '#818cf8', '#d946ef', '#fda4af', '#fda4af', '#fbbf24', '#ef4444', '#14b8a6', '#ec4899'
        ],
        hoverBackgroundColor: '#93c5fd',
        hoverOffset: 2,
      }
    ],
  };

  const barData = analytics.total_loan && {
    labels: moment.months(),
    datasets: [
      {
        label: 'Fine',
        data: analytics.total_loan.reduce((acc, loan) => {
          const monthIndex = moment(loan.return_date).month();
          acc[monthIndex] += loan.fine;
          return acc;
        }, Array(12).fill(0)),
        backgroundColor: '#0ea5e9',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }
    ],
  };

  const lineData = analytics.total_loan && {
    labels: moment.months(),
    datasets: [
      {
        label: 'Number of Loans',
        data: analytics.total_loan.reduce((acc, loan) => {
          const monthIndex = moment(loan.loan_date).month();
          acc[monthIndex] += 1;
          return acc;
        }, Array(12).fill(0)),
        fill: false,
        borderColor: '#60a5fa',
        backgroundColor: '#60a5fa',
        tension: 0.1,
      }
    ],
  };

  // Prepare data for Doughnut chart
  const majorsAndStandards = analytics.students ? analytics.students.map(student => `${student.major}\n(${student.standard})`) : [];
  const uniqueMajorsAndStandards = [...new Set(majorsAndStandards)];
  const majorCounts = uniqueMajorsAndStandards.map(label => majorsAndStandards.filter(m => m === label).length);

  const generateColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = `hsl(${Math.floor((360 / numColors) * i)}, 100%, 70%)`;
      colors.push(color);
    }
    return colors;
  };
  
  const numberOfSegments = uniqueMajorsAndStandards.length;
  const colors = generateColors(numberOfSegments);
  
  const doughnutData = {
    labels: ['All Students'],
    datasets: [
      {
        data: majorCounts,
        backgroundColor: colors,
        hoverBackgroundColor: colors.map(color => {
          const [h, s, l] = color.match(/\d+/g).map(Number);
          return `hsl(${h}, ${s}%, ${l - 10}%)`; // Slightly darker for hover
        }),
      }
    ]
  };
  
  const doughnutOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          title: function(tooltipItems) {
            return uniqueMajorsAndStandards[tooltipItems[0].dataIndex];
          },
          label: function() {
            return 'Student';
          }
        }
      }
    }
  };
  
  

  const options = {
    scales: {
      x: {
        type: 'category',
        labels: moment.months().map(month => moment(month, 'MMMM').format('MMM')),
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 500,
          max: 5000,
        },
        title: {
          display: true,
          text: 'Fine Amount',
        },
      }
    }
  };

  const lineChartOptions = {
    scales: {
      x: {
        type: 'category',
        labels: moment.months().map(month => moment(month, 'MMMM').format('MMM')),
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Books',
        },
      }
    }
  };

  return (
    <div className='p-5'>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        <div className="md:col-span-4">
          <div className="p-2 md:p-5 shadow rounded-lg bg-white dark:bg-slate-700 md:h-[400px]">
            <Pie data={pieData} />
          </div>
        </div>
        <div className="md:col-span-8">
          <div className="p-2 md:p-5 shadow rounded-lg bg-white dark:bg-slate-700 md:h-[400px]">
            {barData && <Bar data={barData} options={options} />}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-3">
        <div className="md:col-span-7">
          <div className="p-2 md:p-5 shadow rounded-lg bg-white dark:bg-slate-700 md:h-[400px]">
            {lineData && <Line data={lineData} options={lineChartOptions} />}
          </div>
        </div>
        <div className="md:col-span-5">
          <div className="p-2 md:p-5 flex justify-center shadow rounded-lg bg-white dark:bg-slate-700 md:h-[400px]">
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Analytics);