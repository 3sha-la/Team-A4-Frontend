import React, { useState } from "react";
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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  Package,
  ShoppingBag,
  Users,
  AlertTriangle,
  Search,
  Plus,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Edit,
  Trash2,
} from "lucide-react";

const monthlyRevenueData = [
  { month: "Jan", revenue: 45000, orders: 320 },
  { month: "Feb", revenue: 52000, orders: 380 },
  { month: "Mar", revenue: 48000, orders: 350 },
  { month: "Apr", revenue: 61000, orders: 420 },
  { month: "May", revenue: 55000, orders: 390 },
  { month: "Jun", revenue: 67000, orders: 480 },
];

const categoryData = [
  { name: "Dresses", value: 45, color: "#F3C649" },
  { name: "Tops", value: 25, color: "#111827" },
  { name: "Bottoms", value: 20, color: "#6B7280" },
  { name: "Accessories", value: 10, color: "#E5E7EB" },
];

const initialProducts = [
  {
    id: "PROD-001",
    name: "Linen Summer Dress",
    category: "Dresses",
    price: "LKR 8,500",
    stock: 42,
    status: "In Stock",
  },
  {
    id: "PROD-002",
    name: "Classic Silk Shirt",
    category: "Tops",
    price: "LKR 12,000",
    stock: 8,
    status: "Low Stock",
  },
  {
    id: "PROD-003",
    name: "Tailored Trousers",
    category: "Bottoms",
    price: "LKR 9,800",
    stock: 0,
    status: "Out of Stock",
  },
  {
    id: "PROD-004",
    name: "Leather Shoulder Bag",
    category: "Accessories",
    price: "LKR 15,500",
    stock: 18,
    status: "In Stock",
  },
];

const AdminDashboard = () => {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = products.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "In Stock":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Low Stock":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Out of Stock":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-8 font-sans text-zinc-800 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-serif text-black">
            Executive Overview
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Real-time business performance, inventory, and sales analytics.
          </p>
        </div>
      </div>

      <hr className="border-gray-200 border-dashed" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs">
          <div className="flex justify-between items-start">
            <p className="text-xs text-gray-500 font-medium">Total Revenue</p>
            <span className="p-2 bg-amber-50 rounded-lg text-[#E5A800]">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <p className="text-2xl font-bold text-black mt-2">LKR 3,280,000</p>
          <div className="flex items-center gap-1 text-emerald-600 text-xs font-semibold mt-2">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>14.2%</span>
            <span className="text-gray-400 font-normal">vs last month</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs">
          <div className="flex justify-between items-start">
            <p className="text-xs text-gray-500 font-medium">Total Orders</p>
            <span className="p-2 bg-stone-100 rounded-lg text-black">
              <ShoppingBag className="w-4 h-4" />
            </span>
          </div>
          <p className="text-2xl font-bold text-black mt-2">2,340</p>
          <div className="flex items-center gap-1 text-emerald-600 text-xs font-semibold mt-2">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>8.1%</span>
            <span className="text-gray-400 font-normal">vs last month</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs">
          <div className="flex justify-between items-start">
            <p className="text-xs text-gray-500 font-medium">In-Stock Items</p>
            <span className="p-2 bg-stone-100 rounded-lg text-black">
              <Package className="w-4 h-4" />
            </span>
          </div>
          <p className="text-2xl font-bold text-black mt-2">68 Items</p>
          <div className="flex items-center gap-1 text-rose-600 text-xs font-semibold mt-2">
            <ArrowDownRight className="w-3.5 h-3.5" />
            <span>3 Low Stock</span>
            <span className="text-gray-400 font-normal">alerts</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs">
          <div className="flex justify-between items-start">
            <p className="text-xs text-gray-500 font-medium">
              Active Customers
            </p>
            <span className="p-2 bg-stone-100 rounded-lg text-black">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <p className="text-2xl font-bold text-black mt-2">1,890</p>
          <div className="flex items-center gap-1 text-emerald-600 text-xs font-semibold mt-2">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>5.4%</span>
            <span className="text-gray-400 font-normal">vs last month</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-base text-black">Revenue Trend</h3>
              <p className="text-xs text-gray-400">Monthly breakdown</p>
            </div>
            <span className="text-xs font-semibold text-gray-500 bg-stone-100 px-3 py-1 rounded-full">
              2026
            </span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyRevenueData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    border: "1px solid #e5e7eb",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#E5A800"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#E5A800" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-base text-black">
              Category Breakdown
            </h3>
            <p className="text-xs text-gray-400 mb-4">
              Stock proportion by category
            </p>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
            {categoryData.map((cat) => (
              <div key={cat.name} className="flex items-center gap-2 text-xs">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: cat.color }}
                />
                <span className="text-gray-600 font-medium">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-stone-200/80 overflow-hidden shadow-xs space-y-4 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="font-bold text-lg text-black">
              Inventory Management
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Live stock levels and status
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search inventory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-4 py-2 text-xs outline-none focus:border-black transition"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-stone-50 border border-stone-200 text-xs font-medium rounded-xl px-3 py-2 outline-none cursor-pointer"
            >
              <option value="All">All Categories</option>
              <option value="Dresses">Dresses</option>
              <option value="Tops">Tops</option>
              <option value="Bottoms">Bottoms</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-gray-500 uppercase font-semibold border-y border-stone-100">
              <tr>
                <th className="py-3.5 px-4">Item Code</th>
                <th className="py-3.5 px-4">Product Name</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Stock Level</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-gray-800">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((item) => (
                  <tr key={item.id} className="hover:bg-stone-50/60 transition">
                    <td className="py-3.5 px-4 font-mono font-medium text-gray-500">
                      {item.id}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-black">
                      {item.name}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-gray-600">
                      {item.category}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-black">
                      {item.price}
                    </td>
                    <td className="py-3.5 px-4 font-semibold">
                      {item.stock} pcs
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusBadge(item.status)}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-1.5 hover:bg-stone-100 rounded-lg text-gray-500 hover:text-black transition">
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 hover:bg-rose-50 rounded-lg text-gray-500 hover:text-rose-600 transition">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-gray-400">
                    No matching inventory items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
