import React, { useEffect, useMemo, useState } from "react";
import { apiFetch } from "../../lib/api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const loadOrders = async () => {
    try {
      const data = await apiFetch('/admin/orders', { auth: true });
      setOrders((data.orders || []).map((order) => ({
        id: order._id,
        customer: order.user?.name || 'Customer',
        date: order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '',
        items: `${(order.orderItems || []).reduce((sum, item) => sum + (Number(item.qty) || 1), 0)} items`,
        total: Number(order.totalPrice || 0).toLocaleString(),
        totalValue: Number(order.totalPrice || 0),
        status: order.status,
        createdAt: order.createdAt,
      })));
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await apiFetch(`/admin/orders/${orderId}/status`, {
        method: 'PUT',
        auth: true,
        body: { status: newStatus },
      });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order,
        ),
      );
    } catch (error) {
      alert(error.message);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return "bg-amber-100 text-amber-800";
      case "Confirmed":
        return "bg-sky-100 text-sky-800";
      case "Shipped":
        return "bg-emerald-100 text-emerald-800";
      case "Delivered":
        return "bg-zinc-800 text-white";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesFilter = filter === "All" || order.status === filter;
    const query = searchTerm.toLowerCase();
    const matchesSearch =
      order.id.toLowerCase().includes(query) ||
      order.customer.toLowerCase().includes(query) ||
      order.date.toLowerCase().includes(query) ||
      order.items.toLowerCase().includes(query) ||
      order.total.toString().toLowerCase().includes(query) ||
      order.status.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  const getCount = (status) => {
    if (status === "All") return orders.length;
    return orders.filter((order) => order.status === status).length;
  };

  const revenueToday = useMemo(() => {
    const today = new Date().toDateString();
    return orders
      .filter((order) => order.createdAt && new Date(order.createdAt).toDateString() === today)
      .reduce((sum, order) => sum + order.totalValue, 0);
  }, [orders]);

  return (
    <div className="max-w-[92%] mx-auto space-y-6 font-sans">
      <div>
        <h1 className="text-3xl font-bold font-serif text-black">
          Order Management
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Track and update all customer orders in real time
        </p>
      </div>

      <hr className="border-gray-300 border-dashed" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-500">Total Orders</p>
          <p className="text-2xl font-bold text-black mt-1">{orders.length}</p>
          <span className="text-xs text-gray-500">+24 today</span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-black mt-1">
            {getCount("Pending")}
          </p>
          <span className="text-xs text-amber-600 font-medium">
            Needs action
          </span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-500">Shipped</p>
          <p className="text-2xl font-bold text-black mt-1">
            {getCount("Shipped")}
          </p>
          <span className="text-xs text-gray-500">In transit</span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-500">Revenue Today</p>
          <p className="text-2xl font-bold text-black mt-1">LKR {revenueToday.toLocaleString()}</p>
          <span className="text-xs text-emerald-600 font-medium">
            +12% vs yesterday
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4">
        <div className="flex flex-wrap gap-2">
          {["All", "Pending", "Confirmed", "Shipped", "Delivered"].map(
            (status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition ${
                  filter === status
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                }`}
              >
                {status} ({String(getCount(status)).padStart(2, "0")})
              </button>
            ),
          )}
        </div>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Orders..."
          className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-xs w-full md:w-64 outline-none focus:border-black transition"
        />
      </div>

      <div className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 uppercase font-semibold">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Date</th>
              <th className="p-4">Items</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status & Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-800">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50">
                  <td className="p-4 font-bold">{item.id}</td>
                  <td className="p-4 font-semibold">{item.customer}</td>
                  <td className="p-4 text-gray-500">{item.date}</td>
                  <td className="p-4 text-gray-600">{item.items}</td>
                  <td className="p-4 font-bold">LKR {item.total}</td>
                  <td className="p-4 flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold ${getStatusStyle(
                        item.status,
                      )}`}
                    >
                      {item.status}
                    </span>
                    <select
                      value={item.status}
                      onChange={(e) =>
                        handleStatusChange(item.id, e.target.value)
                      }
                      className="bg-gray-100 border border-gray-200 text-[11px] font-medium rounded px-2 py-1 outline-none cursor-pointer"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="p-8 text-center text-gray-400 font-medium"
                >
                  No orders found matching your search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
