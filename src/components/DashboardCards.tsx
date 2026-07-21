interface Props {
    total: number;
    count: number;
    highest: number;
    monthlyTotal: number;
  }
  
  function DashboardCards({
    total,
    count,
    highest,
    monthlyTotal,
  }: Props) {
    return (
      <div className="cards">
  
        <div className="card">
          <h3>💰 Total Expense</h3>
          <p>PKR {total.toLocaleString()}</p>
        </div>
  
        <div className="card">
          <h3>📋 Total Records</h3>
          <p>{count}</p>
        </div>
  
        <div className="card">
          <h3>📈 Highest Expense</h3>
          <p>PKR {highest.toLocaleString()}</p>
        </div>
  
        <div className="card">
          <h3>📅 Monthly Spending</h3>
          <p>PKR {monthlyTotal.toLocaleString()}</p>
        </div>
  
      </div>
    );
  }
  
  export default DashboardCards;