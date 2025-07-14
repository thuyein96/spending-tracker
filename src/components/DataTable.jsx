const DataTable = ({ data = [] }) => {
  if (!data || data.length === 0) {
    return (
      <div className="no-records">
        <h3>No expenses recorded yet</h3>
        <p>Add your first expense to get started!</p>
      </div>
    );
  }

  // Sort data by date (newest first)
  const sortedData = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Category</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((item, index) => (
          <tr key={item.id || index}>
            <td>{new Date(item.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}</td>
            <td>{item.name}</td>
            <td className="amount-cell">
              ฿{parseFloat(item.amount || 0).toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
