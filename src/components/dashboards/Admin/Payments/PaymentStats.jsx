const PaymentStatsCards = ({ stats }) => {
  return (
    <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-6">
      <div className="tw-bg-white tw-shadow tw-rounded-xl tw-p-6">
        <p className="tw-text-gray-500">Total Payments</p>
        <h2 className="tw-text-2xl tw-font-bold">{stats.total}</h2>
      </div>

      <div className="tw-bg-white tw-shadow tw-rounded-xl tw-p-6">
        <p className="tw-text-gray-500">Total Revenue</p>
        <h2 className="tw-text-2xl tw-font-bold">
          ₹{stats.totalRevenue.toLocaleString()}
        </h2>
      </div>

      <div className="tw-bg-white tw-shadow tw-rounded-xl tw-p-6">
        <p className="tw-text-gray-500">Paid Payments</p>
        <h2 className="tw-text-2xl tw-font-bold">
          {stats.paidCount|| 0}
        </h2>
      </div>
    </div>
  );
};

export default PaymentStatsCards;
