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
import { useTheme } from '@/context/ThemeContext';

const COLORS = ["#3b82f6", "#10b981"];

const PaymentChart = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { data, isLoading } = useGetCombinedStatsQuery();

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 gap-6">
        <div className={`shadow-lg rounded-2xl p-8 text-center ${
          isDark
            ? 'bg-gradient-to-br from-slate-800 to-slate-700'
            : 'bg-gradient-to-br from-slate-50 to-slate-100'
        }`}>
          <div className="inline-block">
            <div className={`h-12 w-12 animate-spin rounded-full border-4 ${
              isDark
                ? 'border-slate-600 border-t-blue-400'
                : 'border-slate-200 border-t-blue-600'
            }`}></div>
          </div>
          <p className={`font-medium mt-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Loading statistics...</p>
        </div>
      </div>
    );
  }

  const stats = data?.data;

  if (!stats) {
    return (
      <div className={`shadow-lg rounded-2xl p-8 text-center border ${
        isDark
          ? 'bg-gradient-to-br from-slate-800 to-slate-700 border-slate-700'
          : 'bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200'
      }`}>
        <p className={`font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>No statistics available</p>
      </div>
    );
  }

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
      <div className={`shadow-lg rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300 border ${
        isDark
          ? 'bg-slate-800 border-slate-700'
          : 'bg-white border-slate-100'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Revenue Split</h3>
            <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Course vs Internship</p>
          </div>
          <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
            isDark ? 'bg-blue-900/40' : 'bg-blue-100'
          }`}>
            <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
              label={({ name, value }) => `${name}: ₹${(value / 100000).toFixed(1)}L`}
              labelLine={true}
              paddingAngle={2}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => `₹${value.toLocaleString()}`}
              contentStyle={{ 
                backgroundColor: isDark ? "#1e293b" : "#f8fafc",
                border: isDark ? "1px solid #475569" : "1px solid #e2e8f0",
                borderRadius: "8px",
                color: isDark ? "#cbd5e1" : "#1e293b"
              }}
            />
            <Legend 
              wrapperStyle={{ color: isDark ? '#cbd5e1' : '#1e293b', paddingTop: '16px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* ================= Bar Chart ================= */}
      <div className={`shadow-lg rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300 border ${
        isDark
          ? 'bg-slate-800 border-slate-700'
          : 'bg-white border-slate-100'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Revenue Comparison</h3>
            <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Total earnings breakdown</p>
          </div>
          <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
            isDark ? 'bg-emerald-900/40' : 'bg-emerald-100'
          }`}>
            <div className="h-6 w-6 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"></div>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
            <XAxis 
              dataKey="name" 
              stroke={isDark ? "#64748b" : "#94a3b8"}
              style={{ fontSize: "14px", fontWeight: "500" }}
            />
            <YAxis 
              stroke={isDark ? "#64748b" : "#94a3b8"}
              style={{ fontSize: "14px", color: isDark ? "#94a3b8" : "#64748b" }}
              tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`}
            />
            <Tooltip 
              formatter={(value) => `₹${value.toLocaleString()}`}
              contentStyle={{ 
                backgroundColor: isDark ? "#1e293b" : "#f8fafc",
                border: isDark ? "1px solid #475569" : "1px solid #e2e8f0",
                borderRadius: "8px",
                color: isDark ? "#cbd5e1" : "#1e293b"
              }}
            />
            <Bar 
              dataKey="revenue" 
              fill="url(#colorGradient)" 
              radius={[12, 12, 0, 0]}
              maxBarSize={80}
            />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.2}/>
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PaymentChart;
