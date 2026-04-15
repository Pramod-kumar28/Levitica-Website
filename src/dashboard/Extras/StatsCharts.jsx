import * as React from "react"
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
} from "recharts"

import { cn } from "@/lib/utils"

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
]

// ================= CARD WRAPPER =================
function ChartCard({ title, children, className }) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-card text-card-foreground shadow-sm backdrop-blur supports-[backdrop-filter]:bg-card/60",
        "p-5 sm:p-6",
        className
      )}
    >
      <h3 className="mb-4 text-sm font-semibold text-muted-foreground">
        {title}
      </h3>
      <div className="h-[260px] sm:h-[300px]">{children}</div>
    </div>
  )
}

// ================= MAIN =================
export default function StatsCharts({ data }) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      
      {/* ================= BAR CHART ================= */}
      <ChartCard title="Platform Overview">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis
              dataKey="label"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="count" radius={[8, 8, 0, 0]}>
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* ================= PIE CHART ================= */}
      <ChartCard title="Distribution">
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
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  )
}