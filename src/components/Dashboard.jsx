import { defaults } from "chart.js/auto";
import { useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

const Dashboard = () => {
  // Filter
  const [filter, setFilter] = useState("Monthly");
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Get records from localStorage
  const records = window.localStorage.getItem('records') ? JSON.parse(window.localStorage.getItem('records')) : [];

  const getFilterRecords = () => {
    return records.filter(record => {
      const recordDate = new Date(record.date);
      const selected = new Date(selectedDate);

      if(filter === "Daily"){
        return recordDate.toDateString() === selected.toDateString();
      }else if(filter === "Weekly"){
        const weekStart = new Date(selected);
        weekStart.setDate(weekStart.getDate() - weekStart.getDay());

        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);

        return recordDate >= weekStart && recordDate <= weekEnd;
      }else if(filter === "Monthly"){
        return (
          recordDate.getMonth() === selected.getMonth() &&
          recordDate.getFullYear() === selected.getFullYear()
        );
      }
      return true;
    });
  };

  const filteredRecords = getFilterRecords();

  const totalAllTime = records.reduce((sum,r) => sum + parseFloat(r.amount || 0), 0);
  const selectedTotal = filteredRecords.reduce((sum,r) => sum + parseFloat(r.amount || 0), 0);
  
  // Calculate expenses by category
  const categoryTotals = filteredRecords.reduce((acc, record) => {
    if (!acc[record.name]) {
      acc[record.name] = 0;
    }
    acc[record.name] += parseFloat(record.amount || 0);
    return acc;
  }, {});

  const dateTotals = filteredRecords.reduce((acc, record) => {
    const date = new Date(record.date).toLocaleDateString("en-US");
    if(!acc[date]) acc[date] = 0;
    acc[date] += parseFloat(record.amount || 0);
    return acc;
  }, {});

  const lineLabels = Object.keys(dateTotals);
  const lineValues = Object.values(dateTotals);

  // Convert categoryTotals object to array for charts
  // const categoryTotalsArray = Object.entries(categoryTotals).map(([name, amount]) => ({
  //   name,
  //   amount
  // }));

  // const monthlyData = records.reduce((acc, record) => {
  //     const month = record.month;
  //     if (!acc[month]) {
  //       acc[month] = 0;
  //     }
  //     acc[month] += parseFloat(record.amount || 0);
  //     return acc;
  //   }, {});

  // const monthOrder = ['January', 'February', 'March', 'April', 'May', 'June', 
  //                      'July', 'August', 'September', 'October', 'November', 'December'];
    
    // Filter and sort months that have data
    // const sortedMonths = monthOrder.filter(month => monthlyData[month]);
    // const sortedAmounts = sortedMonths.map(month => monthlyData[month]);

    // Convert month names to abbreviated format for display
    // const monthLabels = sortedMonths.map(month => {
    //   const monthMap = {
    //     'January': 'Jan', 'February': 'Feb', 'March': 'Mar', 'April': 'Apr',
    //     'May': 'May', 'June': 'Jun', 'July': 'Jul', 'August': 'Aug',
    //     'September': 'Sep', 'October': 'Oct', 'November': 'Nov', 'December': 'Dec'
    //   };
    //   return monthMap[month];
    // });

  
  return (
    <div className="dashboard">
      
        <div className="filters">
          <label>Filter By : </label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value={"Daily"}>Daily</option>
            <option value={"Weekly"}>Weekly</option>
            <option value={"Monthly"}>Monthly</option>
          </select>

          <input
            type="date"
            value={selectedDate.toISOString().split("T")[0]}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
          />
      </div>

      <div className="totals">
        <h3>Total Spending (All Time) : ฿{totalAllTime.toLocaleString()}</h3>
        <h3>Total Spending ({filter}) : ฿{selectedTotal.toLocaleString()}</h3>
      </div>
      
      

      <div className="dataCard lineCard">
        <Line
          data={{
            labels: lineLabels,
            datasets: [
              {
                label: `Spending (${filter})`,
                data: lineValues,
                backgroundColor: "#064FF0",
                borderColor: "#064FF0",
              }
            ],
          }}
          options={{
            elements: {
              line: {
                tension: 0.5,
              },
            },
            plugins: {
              title: {
                text: `Expenses Overview (${filter})`,
              },
            },
          }}
        />
      </div>

      <div className="dataCard barCard">
        <Bar
          data={{
            labels: Object.keys(categoryTotals),
            datasets: [
              {
                label: `Amount (${filter})`,
                data: Object.values(categoryTotals),
                backgroundColor: [
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                ],
                borderRadius: 5,
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: `Spending by Category (${filter})`,
              },
            },
          }}
        />
      </div>

      <div className="dataCard pieCard">
        <Doughnut
          data={{
            labels: Object.keys(categoryTotals),
            datasets: [
              {
                label: `Expenses by Category (${filter})`,
                data: Object.values(categoryTotals),
                backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56",
                  "#4BC0C0",
                  "#9966FF",
                ],
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                display: true,
                text: `Expenses by Category (${filter})`,
              },
            },
          }}
        />
      </div>
    </div>
  )    
};

export default Dashboard;
