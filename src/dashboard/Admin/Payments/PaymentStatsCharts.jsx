import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { useGetCombinedStatsQuery } from '@/Services/paymentServices/transactionServices';
import { useTheme } from '@/context/ThemeContext';
import { motion } from "framer-motion";
import { FiActivity } from "react-icons/fi";
import RevenueTrendChart from "@/dashboard/common/RevenueTrendChart";

const COLORS = ["#2F73F2", "#10b981"];

const PaymentChart = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { data, isLoading, error } = useGetCombinedStatsQuery();

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 gap-6">
        <div className={`rounded-xl shadow-property p-8 text-center border ${
          isDark
            ? 'bg-semidark border-dark_border'
            : 'bg-white border-border'
        }`}>
          <div className="inline-block">
            <div className={`h-12 w-12 animate-spin rounded-full border-4 ${
              isDark
                ? 'border-dark_border border-t-primary'
                : 'border-border border-t-primary'
            }`}></div>
          </div>
          <p className={`font-medium mt-4 text-gray`}>Loading statistics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`rounded-xl shadow-property p-8 text-center border ${
        isDark
          ? 'bg-semidark border-dark_border'
          : 'bg-white border-border'
      }`}>
        <p className={`font-medium text-rose-500`}>Failed to load statistics</p>
        <p className={`text-sm text-gray mt-2`}>Please try again later</p>
      </div>
    );
  }

  const stats = data?.data;

  if (!stats) {
    return (
      <div className={`rounded-xl shadow-property p-8 text-center border ${
        isDark
          ? 'bg-semidark border-dark_border'
          : 'bg-white border-border'
      }`}>
        <p className={`font-medium text-gray`}>No statistics available</p>
      </div>
    );
  }

  const courseRevenue = stats.courseRevenue || stats.courseTotal || stats.course_amount || 0;
  const internshipRevenue = stats.internshipRevenue || stats.internshipTotal || stats.internship_amount || 0;

  const pieData = [
    { name: "Course Revenue", value: courseRevenue, color: COLORS[0] },
    { name: "Internship Revenue", value: internshipRevenue, color: COLORS[1] },
  ].filter(item => item.value > 0);

  const totalRevenue = courseRevenue + internshipRevenue;

  if (totalRevenue === 0) {
    return (
      <div className="grid md:grid-cols-2 gap-6">
        <div className={`rounded-xl shadow-property p-8 text-center border ${
          isDark
            ? 'bg-semidark border-dark_border'
            : 'bg-white border-border'
        }`}>
          <div className="flex flex-col items-center justify-center">
            <div className={`h-16 w-16 rounded-full flex items-center justify-center mb-4 ${
              isDark ? 'bg-darklight' : 'bg-light'
            }`}>
              <FiActivity className="h-8 w-8 text-gray" />
            </div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-midnight_text'}`}>No Revenue Data</h3>
            <p className={`text-sm text-gray mt-2 text-center`}>
              No payment transactions found yet.<br />
              Revenue data will appear here once payments are processed.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Custom label render function for PieChart
  const renderCustomLabel = ({ name, value }) => {
    if (value === 0) return "";
    const percentage = totalRevenue > 0 ? Math.round((value / totalRevenue) * 100) : 0;
    return `${percentage}%`;
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* ================= Pie Chart ================= */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`rounded-xl shadow-property hover:shadow-deatail_shadow transition-all duration-300 p-6 sm:p-8 border ${
          isDark
            ? 'bg-semidark border-dark_border'
            : 'bg-white border-border'
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-midnight_text'}`}>Revenue Split</h3>
            <p className={`text-sm mt-1 text-gray`}>Course vs Internship</p>
          </div>
          <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${
            isDark ? 'bg-primary/20' : 'bg-primary/10'
          }`}>
            <div className="h-6 w-6 rounded-full bg-gradient-to-r from-primary to-skyBlue"></div>
          </div>
        </div>

        <div className={`mb-4 p-3 rounded-lg text-center ${
          isDark ? 'bg-darklight' : 'bg-light'
        }`}>
          <p className={`text-xs text-gray`}>Total Revenue</p>
          <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-midnight_text'}`}>
            ₹{totalRevenue.toLocaleString()}
          </p>
          <div className="flex items-center justify-center gap-4 mt-2">
            {courseRevenue > 0 && (
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span className="text-xs text-gray">Course: {Math.round((courseRevenue / totalRevenue) * 100)}%</span>
              </div>
            )}
            {internshipRevenue > 0 && (
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-xs text-gray">Internship: {Math.round((internshipRevenue / totalRevenue) * 100)}%</span>
              </div>
            )}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
              label={renderCustomLabel}
              labelLine={true}
              paddingAngle={2}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']}
              contentStyle={{ 
                backgroundColor: isDark ? "#0e1624" : "#ffffff",
                border: isDark ? "1px solid #224767" : "1px solid #6bc5f94d",
                borderRadius: "8px",
                color: isDark ? "#ffffff" : "#102D47"
              }}
            />
            <Legend 
              wrapperStyle={{ color: isDark ? '#668199' : '#668199', paddingTop: '16px' }}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className={`grid grid-cols-2 gap-3 mt-4 pt-4 border-t ${
          isDark ? 'border-dark_border' : 'border-border'
        }`}>
          {courseRevenue > 0 && (
            <div className={`p-2 rounded-lg text-center ${isDark ? 'bg-darklight' : 'bg-light'}`}>
              <p className={`text-xs text-gray`}>Course Revenue</p>
              <p className={`text-sm font-bold text-primary`}>
                ₹{courseRevenue.toLocaleString()}
              </p>
            </div>
          )}
          {internshipRevenue > 0 && (
            <div className={`p-2 rounded-lg text-center ${isDark ? 'bg-darklight' : 'bg-light'}`}>
              <p className={`text-xs text-gray`}>Internship Revenue</p>
              <p className={`text-sm font-bold text-emerald-500`}>
                ₹{internshipRevenue.toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* ================= Revenue Trend Chart ================= */}
      <RevenueTrendChart />
    </div>
  );
};

export default PaymentChart;