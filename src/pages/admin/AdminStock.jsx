import React, { useState } from "react";
import { stockData } from "../../data/adminData";

const AdminStock = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [stockList, setStockList] = useState(stockData);
  const [qtyInputs, setQtyInputs] = useState({});

  const recentActivities = [
    {
      id: 1,
      sku: "HOS-AP-301",
      time: "2h ago",
      text: "+40 units added",
      color: "text-emerald-600 font-medium",
    },
    {
      id: 2,
      sku: "HOS-JW-048",
      time: "5h ago",
      text: "Low stock alert sent",
      color: "text-amber-600 font-medium",
    },
    {
      id: 3,
      sku: "HOS-AC-109",
      time: "1d ago",
      text: "Sold out",
      color: "text-rose-500 font-medium",
    },
  ];

  const handleQtyChange = (id, val) => {
    setQtyInputs({ ...qtyInputs, [id]: val });
  };

  const handleUpdateStock = (id) => {
    const addQty = parseInt(qtyInputs[id], 10);
    if (isNaN(addQty) || addQty <= 0) return;

    setStockList((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newStock = item.stock + addQty;
          let newStatus = "IN STOCK";
          if (newStock === 0) newStatus = "OUT OF STOCK";
          else if (newStock <= 5) newStatus = "LOW STOCK";

          return { ...item, stock: newStock, status: newStatus };
        }
        return item;
      }),
    );

    setQtyInputs({ ...qtyInputs, [id]: "" });
  };

  const filteredProducts = stockList.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      item.category.toUpperCase() === selectedCategory.toUpperCase();

    const matchesStatus =
      selectedStatus === "All" || item.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "IN STOCK":
        return "bg-[#E2F7E2] text-[#2E7D32] border-transparent font-bold";
      case "LOW STOCK":
        return "bg-[#FFF4E5] text-[#B76E00] border-[#FFD8A8] font-bold";
      case "OUT OF STOCK":
        return "bg-[#FDE8E8] text-[#C81E1E] border-transparent font-bold";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="max-w-[100%] mx-auto space-y-6 font-sans text-[#1A1A1A]">
      <div>
        <h1 className="text-3xl font-bold font-serif text-[#1C1B1F] tracking-tight">
          Stock management
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Track inventory levels and update quantities as stock moves.
        </p>
      </div>

      <hr className="border-gray-300 border-dashed" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#212121] text-white p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <p className="text-xs text-gray-400 font-medium">
              Total Stock Units
            </p>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-extrabold font-serif">1,420</span>
              <span className="text-xs text-gray-400">items</span>
            </div>
          </div>
          <p className="text-[11px] text-[#E5A800] mt-4 font-medium">
            Across 148 product variants
          </p>
        </div>

        <div className="bg-[#3D3A39] text-white p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <p className="text-xs text-gray-400 font-medium">Out of Stock</p>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-extrabold font-serif">1</span>
              <span className="text-xs text-gray-400">item</span>
            </div>
          </div>
          <p className="text-[11px] text-[#FF8A8A] mt-4 font-medium">
            Requires immediate restocking
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-500 font-medium">
                Low Stock Alert
              </p>
              <span className="text-amber-500 text-xs">⚡</span>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-extrabold font-serif text-black">
                2
              </span>
              <span className="text-xs text-gray-500">items</span>
            </div>
          </div>
          <p className="text-[11px] text-emerald-600 mt-4 font-semibold flex items-center gap-1">
            <span>⚠️</span> Stock count &lt; 5 units
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
            🔍
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search product SKU or name..."
            className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-xs outline-none focus:border-black transition"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-white border border-gray-200 text-gray-700 text-xs font-semibold px-4 py-2.5 rounded-xl outline-none cursor-pointer"
          >
            <option value="All">All Categories</option>
            <option value="APPAREL">Apparel</option>
            <option value="JEWELRY">Jewelry</option>
            <option value="ACCESSORIES">Accessories</option>
            <option value="FOOTWEAR">Footwear</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-white border border-gray-200 text-gray-700 text-xs font-semibold px-4 py-2.5 rounded-xl outline-none cursor-pointer"
          >
            <option value="All">Filter Status</option>
            <option value="IN STOCK">In Stock</option>
            <option value="LOW STOCK">Low Stock</option>
            <option value="OUT OF STOCK">Out of Stock</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#2D2828] text-white uppercase text-[9px] tracking-wider font-semibold">
                <tr>
                  <th className="p-4">PRODUCT</th>
                  <th className="p-4">CATEGORY</th>
                  <th className="p-4">CURRENT STOCK</th>
                  <th className="p-4">STATUS</th>
                  <th className="p-4 text-center">UPDATE QTY</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-sans">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-stone-50/60 transition"
                    >
                      <td className="p-4 flex items-center gap-3">
                        <img
                          src={item.image}
                          alt=""
                          className="w-10 h-10 rounded-lg object-cover bg-stone-100 border border-gray-100"
                        />
                        <div>
                          <p className="font-bold text-black text-xs">
                            {item.name}
                          </p>
                          <p className="text-[10px] text-gray-400 mt-0.5">
                            {item.sku}
                          </p>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="bg-stone-100 text-gray-600 font-bold px-2.5 py-1 rounded text-[9px] uppercase tracking-wider">
                          {item.category}
                        </span>
                      </td>

                      <td className="p-4 font-bold text-sm text-black">
                        {item.stock}
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 rounded text-[9px] border ${getStatusBadge(item.status)}`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <input
                            type="number"
                            placeholder="Qty"
                            value={qtyInputs[item.id] || ""}
                            onChange={(e) =>
                              handleQtyChange(item.id, e.target.value)
                            }
                            className="w-12 bg-stone-50 border border-gray-200 rounded-lg py-1 px-1.5 text-center text-xs outline-none focus:border-black"
                          />
                          <button
                            onClick={() => handleUpdateStock(item.id)}
                            className="bg-[#E5A800] hover:bg-[#c89300] text-black font-bold text-xs px-3 py-1.5 rounded-lg transition"
                          >
                            Update
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-400">
                      No stock items match your search/filter criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-stone-50/50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span>
              Showing {filteredProducts.length} of {stockList.length} luxury
              products
            </span>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold hover:bg-stone-50">
                Previous
              </button>
              <button className="px-3 py-1.5 bg-[#3D3A39] text-white rounded-lg text-xs font-semibold hover:bg-black">
                Next
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h4 className="font-bold text-sm text-black">Inventory Health</h4>
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-gray-600 mb-1">
                  <span>In Stock (85%)</span>
                  <b className="text-black">126 items</b>
                </div>
                <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-stone-400 h-full w-[85%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-gray-600 mb-1">
                  <span>Low Stock (10%)</span>
                  <b className="text-black">15 items</b>
                </div>
                <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#E5A800] h-full w-[10%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-gray-600 mb-1">
                  <span>Out of Stock (5%)</span>
                  <b className="text-black">7 items</b>
                </div>
                <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full w-[5%]" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h4 className="font-bold text-sm text-black">
              Recent Restock Activity
            </h4>
            <div className="space-y-2.5">
              {recentActivities.map((act) => (
                <div
                  key={act.id}
                  className="p-3 bg-stone-50/80 rounded-xl border border-stone-100 flex justify-between items-start"
                >
                  <div>
                    <p className="font-bold text-xs text-black">{act.sku}</p>
                    <p className={`text-[11px] mt-0.5 ${act.color}`}>
                      {act.text}
                    </p>
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium">
                    {act.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStock;
