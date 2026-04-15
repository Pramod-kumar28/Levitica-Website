import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { useGetCombinedStatsQuery } from '@/Services/paymentServices/transactionServices';

const COLORS = ["#2563eb", "#16a34a"];

const PaymentChart = () => {
  const { data, isLoading } = useGetCombinedStatsQuery();

  if (isLoading) {
    return (
      <div className="bg-white shadow rounded-xl p-6 text-center">
        Loading statistics...
      </div>
    );
  }

  const stats = data?.data;

  if (!stats) {
    return (
      <div className="bg-white shadow rounded-xl p-6 text-center">
        No statistics available
      </div>
    );
  }

  // =============================
  // Data for Charts
  // =============================

  const pieData = [
    { name: "Course Revenue", value: stats.courseRevenue || 0 },
    { name: "Internship Revenue", value: stats.internshipRevenue || 0 },
  ];

  const barData = [
    {
      name: "Course",
      revenue: stats.courseRevenue || 0,
    },
    {
      name: "Internship",
      revenue: stats.internshipRevenue || 0,
    },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6">

      {/* ================= Pie Chart ================= */}
      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="font-semibold mb-4">
          Revenue Split
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* ================= Bar Chart ================= */}
      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="font-semibold mb-4">
          Revenue Comparison
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PaymentChart;
