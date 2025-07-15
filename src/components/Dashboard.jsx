import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

const Dashboard = () => {
  // Get records from localStorage
  const records = window.localStorage.getItem('records') ? JSON.parse(window.localStorage.getItem('records')) : [];
  
  // Calculate expenses by category
  const categoryTotals = records.reduce((acc, record) => {
    if (!acc[record.name]) {
      acc[record.name] = 0;
    }
    acc[record.name] += parseFloat(record.amount || 0);
    return acc;
  }, {});

  // Convert categoryTotals object to array for charts
  const categoryTotalsArray = Object.entries(categoryTotals).map(([name, amount]) => ({
    name,
    amount
  }));



  const monthlyData = records.reduce((acc, record) => {
      const month = record.month;
      if (!acc[month]) {
        acc[month] = 0;
      }
      acc[month] += parseFloat(record.amount || 0);
      return acc;
    }, {});

  const monthOrder = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
    
    // Filter and sort months that have data
    const sortedMonths = monthOrder.filter(month => monthlyData[month]);
    const sortedAmounts = sortedMonths.map(month => monthlyData[month]);

    // Convert month names to abbreviated format for display
    const monthLabels = sortedMonths.map(month => {
      const monthMap = {
        'January': 'Jan', 'February': 'Feb', 'March': 'Mar', 'April': 'Apr',
        'May': 'May', 'June': 'Jun', 'July': 'Jul', 'August': 'Aug',
        'September': 'Sep', 'October': 'Oct', 'November': 'Nov', 'December': 'Dec'
      };
      return monthMap[month];
    });

  
  return (
    <div className="dashboard">
      <div className="dataCard lineCard">
        <Line
          data={{
            labels: monthLabels,
            datasets: [
              {
                label: "Amount",
                data: sortedAmounts,
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
                text: "Expenses Overview",
              },
            },
          }}
        />
      </div>

      <div className="dataCard barCard">
        <Bar
          data={{
            labels: categoryTotalsArray.map((data) => data.name),
            datasets: [
              {
                label: "Amount",
                data: categoryTotalsArray.map((data) => data.amount),
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
                text: "Revenue Source",
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
                label: "Expenses by Category",
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
                text: "Expenses by Category",
              },
            },
          }}
        />
      </div>
    </div>
  )    
};

export default Dashboard;
