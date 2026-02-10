import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#3b82f6"];

const StatsCharts = ({ data }) => {
  return (
    <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-6">
      {/* ================= BAR CHART ================= */}
      <div className="tw-rounded-2xl tw-border tw-bg-white tw-p-6 tw-shadow-sm">
        <h3 className="tw-mb-4 tw-text-sm tw-font-semibold tw-text-slate-700">
          Platform Overview
        </h3>

        <div className="tw-h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ================= PIE CHART ================= */}
      <div className="tw-rounded-2xl tw-border tw-bg-white tw-p-6 tw-shadow-sm">
        <h3 className="tw-mb-4 tw-text-sm tw-font-semibold tw-text-slate-700">
          Distribution
        </h3>

        <div className="tw-h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="count"
                nameKey="label"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StatsCharts;
