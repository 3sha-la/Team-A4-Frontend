import React, { useState } from "react";
import { categoryData, stockData } from "../../data/adminData";

const initialActivities = [
  {
    id: 1,
    name: "Apparel",
    action: "Product count updated",
    time: "2h ago",
    color: "text-gray-500",
  },
  {
    id: 2,
    name: "Accessories",
    action: "Description edited",
    time: "5h ago",
    color: "text-gray-500",
  },
  {
    id: 3,
    name: "Footwear",
    action: "Category hidden",
    time: "1d ago",
    color: "text-rose-500 font-medium",
  },
];

const AdminCategories = () => {
  const [categories, setCategories] = useState(categoryData);
  const [recentActivities, setRecentActivities] = useState(initialActivities);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [filterBy, setFilterBy] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");

  const getProductCount = (tag, fallbackCount) => {
    const stockItems = stockData.filter(
      (item) => item.category.toUpperCase() === tag.toUpperCase(),
    );
    return stockItems.length > 0 ? stockItems.length : fallbackCount || 0;
  };

  const handleOpenAddModal = () => {
    setEditingId(null);
    setCategoryName("");
    setDescription("");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (category) => {
    setEditingId(category.id);
    setCategoryName(category.name);
    setDescription(category.description);
    setIsModalOpen(true);
  };

  const handleDeleteCategory = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}" category?`)) {
      setCategories(categories.filter((cat) => cat.id !== id));
      addActivityLog(name, "Category deleted", "text-rose-500 font-medium");
    }
  };

  const addActivityLog = (name, action, color = "text-gray-500") => {
    const newLog = {
      id: Date.now(),
      name,
      action,
      time: "Just now",
      color,
    };
    setRecentActivities([newLog, ...recentActivities.slice(0, 4)]);
  };

  const handleSaveCategory = (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    if (editingId) {
      setCategories(
        categories.map((cat) =>
          cat.id === editingId
            ? {
                ...cat,
                name: categoryName,
                tag: categoryName.toUpperCase(),
                description: description || "No description provided.",
              }
            : cat,
        ),
      );
      addActivityLog(categoryName, "Description/Name edited", "text-gray-500");
    } else {
      const newCategory = {
        id: Date.now(),
        tag: categoryName.toUpperCase(),
        name: categoryName,
        count: 0,
        description: description || "No description provided.",
      };
      setCategories([newCategory, ...categories]);
      addActivityLog(
        categoryName,
        "Category created",
        "text-emerald-600 font-medium",
      );
    }

    setCategoryName("");
    setDescription("");
    setEditingId(null);
    setIsModalOpen(false);
  };

  const filteredCategories = categories
    .filter((cat) => cat.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((cat) => {
      const count = getProductCount(cat.tag, cat.count);
      if (filterBy === "has_products") return count > 0;
      if (filterBy === "empty") return count === 0;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "count") {
        const countA = getProductCount(a.tag, a.count);
        const countB = getProductCount(b.tag, b.count);
        return countB - countA;
      }
      return 0;
    });

  const totalProductsCount = stockData.length;

  return (
    <div className="max-w-[93%] mx-auto space-y-6 font-sans text-[#1A1A1A] relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-serif text-[#1C1B1F] tracking-tight">
            Category management
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Organize the catalog into browsable categories.
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="bg-[#E5A800] hover:bg-[#c89300] text-black font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm transition flex items-center gap-2 cursor-pointer"
        >
          <span className="text-sm">+</span> Add Category
        </button>
      </div>

      <hr className="border-gray-300 border-dashed" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#212121] text-white p-6 rounded-2xl flex flex-col justify-between">
          <p className="text-xs text-gray-400 font-medium">Total Categories</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-4xl font-extrabold font-serif">
              {categories.length}
            </span>
            <span className="text-xs text-gray-400">categories</span>
          </div>
        </div>

        <div className="bg-[#3D3A39] text-white p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <p className="text-xs text-gray-400 font-medium">Total Products</p>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-extrabold font-serif">
                {totalProductsCount}
              </span>
              <span className="text-xs text-gray-400">items</span>
            </div>
          </div>
          <p className="text-[11px] text-[#E5A800] mt-4 font-medium">
            Across all categories
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col justify-between shadow-sm">
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-500 font-medium">
              Empty Categories
            </p>
            <span className="text-emerald-500 text-xs">✔</span>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-4xl font-extrabold font-serif text-black">
              {
                categories.filter((c) => getProductCount(c.tag, c.count) === 0)
                  .length
              }
            </span>
            <span className="text-xs text-gray-500">categories</span>
          </div>
          <p className="text-[11px] text-emerald-600 mt-4 font-semibold">
            All categories active
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
            placeholder="Search categories..."
            className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-xs outline-none focus:border-black transition"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-gray-200 text-gray-700 text-xs font-semibold px-4 py-2.5 rounded-xl outline-none cursor-pointer"
          >
            <option value="default">Sort by</option>
            <option value="name">Name</option>
            <option value="count">Product Count</option>
          </select>

          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="bg-white border border-gray-200 text-gray-700 text-xs font-semibold px-4 py-2.5 rounded-xl outline-none cursor-pointer"
          >
            <option value="all">⚙ All Categories</option>
            <option value="has_products">With Products</option>
            <option value="empty">Empty Categories</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        <div className="lg:col-span-3 space-y-4">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((item) => {
              const currentCount = getProductCount(item.tag, item.count);
              return (
                <div
                  key={item.id}
                  className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-start hover:border-gray-300 transition"
                >
                  <div className="space-y-2">
                    <span className="bg-amber-50 text-[#B76E00] border border-amber-200 text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {item.tag}
                    </span>
                    <h3 className="text-lg font-bold font-serif text-black">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-400 font-medium">
                      {currentCount} products
                    </p>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEditModal(item)}
                      title="Edit Category"
                      className="p-2 text-gray-400 hover:text-black border border-gray-100 rounded-lg bg-stone-50 hover:bg-stone-100 transition cursor-pointer"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(item.id, item.name)}
                      title="Delete Category"
                      className="p-2 text-gray-400 hover:text-rose-500 border border-gray-100 rounded-lg bg-stone-50 hover:bg-rose-50 transition cursor-pointer"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white p-8 rounded-2xl border border-gray-100 text-center text-xs text-gray-400">
              No categories found.
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h4 className="font-bold text-sm text-black">
              Category Distribution
            </h4>
            <div className="space-y-3 text-xs">
              {categories.map((cat) => {
                const count = getProductCount(cat.tag, cat.count);
                const percent =
                  totalProductsCount > 0
                    ? Math.round((count / totalProductsCount) * 100)
                    : 0;

                return (
                  <div key={cat.id}>
                    <div className="flex justify-between text-gray-600 mb-1">
                      <span>{cat.name}</span>
                      <b className="text-black">{count} items</b>
                    </div>
                    <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#E5A800] h-full transition-all duration-300"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h4 className="font-bold text-sm text-black">Recently Updated</h4>
            <div className="space-y-2.5">
              {recentActivities.map((act) => (
                <div
                  key={act.id}
                  className="p-3 bg-stone-50/80 rounded-xl border border-stone-100 flex justify-between items-start"
                >
                  <div>
                    <p className="font-bold text-xs text-black">{act.name}</p>
                    <p className={`text-[11px] mt-0.5 ${act.color}`}>
                      {act.action}
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl space-y-6 relative border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold font-serif text-[#1A1A1A]">
                  {editingId ? "Edit Category" : "Add Category"}
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  Categories are shown as filters on the shop page.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-black text-xl font-bold cursor-pointer"
              >
                ☒
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-black">
                  Category name <span className="text-amber-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Apparel"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full bg-[#FBF9F6] border border-gray-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-black transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-black">
                  Description
                </label>
                <textarea
                  rows="4"
                  placeholder="Short category description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#FBF9F6] border border-gray-200 rounded-xl p-4 text-xs outline-none focus:border-black transition resize-none"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="border border-gray-200 bg-white hover:bg-stone-50 text-black font-semibold text-xs px-6 py-2.5 rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#E5A800] hover:bg-[#c89300] text-black font-bold text-xs px-6 py-2.5 rounded-xl shadow-sm transition cursor-pointer"
                >
                  {editingId ? "Update Category" : "Save Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
