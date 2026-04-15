const PaymentStatsCards = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white shadow rounded-xl p-6">
        <p className="text-gray-500">Total Payments</p>
        <h2 className="text-2xl font-bold">{stats.total}</h2>
      </div>

      <div className="bg-white shadow rounded-xl p-6">
        <p className="text-gray-500">Total Revenue</p>
        <h2 className="text-2xl font-bold">
          ₹{stats.totalRevenue.toLocaleString()}
        </h2>
      </div>

      <div className="bg-white shadow rounded-xl p-6">
        <p className="text-gray-500">Paid Payments</p>
        <h2 className="text-2xl font-bold">
          {stats.paidCount|| 0}
        </h2>
      </div>
    </div>
  );
};

export default PaymentStatsCards;
