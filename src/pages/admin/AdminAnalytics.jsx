import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const monthlyRevenueData = [
  { month: "June", revenue: 140 },
  { month: "Jul", revenue: 200 },
  { month: "Aug", revenue: 180 },
  { month: "Sep", revenue: 290 },
  { month: "Oct", revenue: 360 },
  { month: "Nov", revenue: 500 },
];

const monthlyOrdersData = [
  { point: 1, orders: 12 },
  { point: 2, orders: 18 },
  { point: 3, orders: 14 },
  { point: 4, orders: 23 },
  { point: 5, orders: 19 },
  { point: 6, orders: 29 },
];

const categoryRevenueData = [
  { category: "Dresses", value: 150 },
  { category: "Blazers", value: 105 },
  { category: "Tops", value: 25 },
  { category: "Bottoms", value: 125 },
  { category: "Accessories", value: 70 },
];

const AdminAnalytics = () => {
  return (
    <div className="max-w-[92%] mx-auto space-y-8 font-sans text-zinc-800 pb-10">
      <div>
        <h1 className="text-3xl font-bold font-serif text-black">
          Sales Analytics
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Revenue, orders, and performance metrics at a glance
        </p>
      </div>

      <hr className="border-gray-300 border-dashed" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
          <p className="text-xs text-gray-500 font-medium">Total Revenue</p>
          <p className="text-xl font-bold text-black mt-2">LKR 103,326,400</p>
          <span className="text-xs font-semibold text-emerald-600 mt-1 inline-block">
            ↑ 12.4%{" "}
            <span className="text-gray-400 font-normal">vs last month</span>
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
          <p className="text-xs text-gray-500 font-medium">Total Orders</p>
          <p className="text-xl font-bold text-black mt-2">3,420</p>
          <span className="text-xs font-semibold text-emerald-600 mt-1 inline-block">
            ↑ 8.7%{" "}
            <span className="text-gray-400 font-normal">vs last month</span>
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
          <p className="text-xs text-gray-500 font-medium">Active Users</p>
          <p className="text-xl font-bold text-black mt-2">14,820</p>
          <span className="text-xs font-semibold text-emerald-600 mt-1 inline-block">
            ↑ 5.3%{" "}
            <span className="text-gray-400 font-normal">vs last month</span>
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
          <p className="text-xs text-gray-500 font-medium">Avg Order Value</p>
          <p className="text-xl font-bold text-black mt-2">LKR 31,800</p>
          <span className="text-xs font-semibold text-rose-600 mt-1 inline-block">
            ↓ 3.1%{" "}
            <span className="text-gray-400 font-normal">vs last month</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-stone-50/50 p-6 rounded-3xl border border-stone-200/60">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-lg text-black">Monthly Revenue</h3>
              <p className="text-xs text-gray-500">Jun – Nov 2024</p>
            </div>
            <select className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs font-semibold text-gray-800 outline-none cursor-pointer shadow-2xs">
              <option>Last 06 Months</option>
            </select>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyRevenueData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E5E7EB"
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#6B7280" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#6B7280" }}
                  ticks={[0, 150, 300, 450, 600]}
                  tickFormatter={(val) => (val === 0 ? "0k" : `${val}K`)}
                />
                <Tooltip
                  formatter={(value) => [`${value}K`, "Revenue"]}
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    border: "1px solid #e5e7eb",
                  }}
                />
                <Line
                  type="linear"
                  dataKey="revenue"
                  stroke="#F3C649"
                  strokeWidth={2}
                  dot={{ r: 6, fill: "#F3C649", strokeWidth: 0 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-stone-50/50 p-6 rounded-3xl border border-stone-200/60 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg text-black">Orders</h3>
            <p className="text-xs text-gray-500 mb-6">Monthly order count</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyOrdersData}
                margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="2 2" stroke="#E5E7EB" />
                <XAxis dataKey="point" hide />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#6B7280" }}
                  ticks={[0, 8, 16, 24, 32]}
                />
                <Tooltip
                  formatter={(value) => [value, "Orders"]}
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    border: "1px solid #e5e7eb",
                  }}
                />
                <Line
                  type="linear"
                  dataKey="orders"
                  stroke="#000000"
                  strokeWidth={2}
                  dot={{ r: 5, fill: "#000000", strokeWidth: 0 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-stone-50/50 p-6 rounded-3xl border border-stone-200/60">
        <h3 className="font-bold text-lg text-black">Revenue by Category</h3>
        <p className="text-xs text-gray-500 mb-6">
          Top performing clothing categories
        </p>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={categoryRevenueData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E5E7EB"
              />
              <XAxis
                dataKey="category"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#111827", fontWeight: 500 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#6B7280" }}
                ticks={[0, 40, 80, 120, 160]}
                tickFormatter={(val) => (val === 0 ? "0K" : `${val}K`)}
              />
              <Tooltip
                formatter={(value) => [`${value}K`, "Revenue"]}
                cursor={{ fill: "rgba(0, 0, 0, 0.02)" }}
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                }}
              />
              <Bar
                dataKey="value"
                fill="#F3C649"
                radius={[2, 2, 0, 0]}
                barSize={55}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
