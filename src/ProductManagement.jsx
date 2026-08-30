import React, { useState } from 'react';

export default function ProductManagement() {
  // 1. Initial Products State (Figma ඩිසයින් එකේ විදිහටම)
  const [products, setProducts] = useState([
    { id: 1, name: 'Royal Banarasi Silk Saree', sku: 'HOS-AP-331', category: 'Apparel', price: 12500, stock: 14, status: 'IN STOCK', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=100' },
    { id: 2, name: 'Kundan Heritage Earrings', sku: 'HOS-JW-042', category: 'Jewelry', price: 3200, stock: 5, status: 'LOW STOCK', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=100' },
    { id: 3, name: 'Embroidered Velvet Shawl', sku: 'HOS-AC-128', category: 'Accessories', price: 8900, stock: 0, status: 'OUT OF STOCK', image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=100' },
    { id: 4, name: 'Handcrafted Mojari Flats', sku: 'HOS-FB-075', category: 'Footwear', price: 5400, stock: 22, status: 'IN STOCK', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=100' },
    { id: 5, name: 'Zardozi Silk Clutch Bag', sku: 'HOS-AC-112', category: 'Accessories', price: 4100, stock: 2, status: 'LOW STOCK', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=100' },
    { id: 6, name: 'Sterling Silver Anklet', sku: 'HOS-JW-058', category: 'Jewelry', price: 3750, stock: 30, status: 'IN STOCK', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=100' },
  ]);

  // 2. States for Search & Filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // 3. Modals State
  const [modalMode, setModalMode] = useState(null); // 'add' | 'edit' | null
  const [currentProduct, setCurrentProduct] = useState({ id: null, name: '', category: 'Apparel', price: '', stock: '', description: '', image: '' });
  
  // 4. Delete Confirmation State
  const [deleteId, setDeleteId] = useState(null);

  // Handlers for Add/Edit
  const handleOpenAddModal = () => {
    setCurrentProduct({ id: null, name: '', category: 'Apparel', price: '', stock: '', description: '', image: '' });
    setModalMode('add');
  };

  const handleOpenEditModal = (prod) => {
    setCurrentProduct(prod);
    setModalMode('edit');
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (modalMode === 'add') {
      const newProd = {
        ...currentProduct,
        id: Date.now(),
        sku: `HOS-PR-${Math.floor(100 + Math.random() * 900)}`,
        status: Number(currentProduct.stock) > 10 ? 'IN STOCK' : Number(currentProduct.stock) > 0 ? 'LOW STOCK' : 'OUT OF STOCK',
        image: currentProduct.image || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=100'
      };
      setProducts([newProd, ...products]);
    } else if (modalMode === 'edit') {
      setProducts(products.map(p => p.id === currentProduct.id ? {
        ...currentProduct,
        status: Number(currentProduct.stock) > 10 ? 'IN STOCK' : Number(currentProduct.stock) > 0 ? 'LOW STOCK' : 'OUT OF STOCK'
      } : p));
    }
    setModalMode(null);
  };

  // Delete Handlers
  const confirmDelete = (id) => {
    setDeleteId(id);
  };

  const executeDelete = () => {
    setProducts(products.filter(p => p.id !== deleteId));
    setDeleteId(null);
  };

  // Filter & Search Logic
  const filteredProducts = products.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex min-h-screen bg-[#F4F4F4] font-sans text-gray-900">
      
      {/* Left Sidebar (Figma Theme) */}
      <aside className="w-72 bg-black text-white flex flex-col justify-between p-6 fixed h-full z-10">
        <div>
          <div className="mb-10">
            <h2 className="font-black text-lg tracking-wide uppercase text-[#FFD700]">House of Salaga</h2>
            <p className="text-[10px] text-gray-400 tracking-widest uppercase">Luxury Heritage Wear</p>
          </div>

          <nav className="space-y-4 text-sm font-medium">
            <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-white transition py-2"><span>🏠</span> Admin Dashboard</a>
            <a href="#" className="flex items-center gap-3 bg-[#1A1A1A] text-[#FFD700] px-4 py-3 rounded-xl font-bold border-l-4 border-[#FFD700]"><span>📦</span> Product Management</a>
            <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-white transition py-2"><span>🏷️</span> Categories</a>
            <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-white transition py-2"><span>📈</span> Stock</a>
          </nav>
        </div>

        <div className="bg-[#121212] p-4 rounded-xl flex items-center justify-between border border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FFD700] text-black font-black flex items-center justify-center">A</div>
            <div>
              <h4 className="text-sm font-bold text-white">Admin</h4>
              <span className="text-[11px] text-red-500 font-medium cursor-pointer">Sign Out</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="ml-72 flex-1 p-10 max-w-[1400px]">
        
        {/* Header & Add Product Button */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-black text-black tracking-tight">Product management</h1>
            <p className="text-sm text-gray-500 mt-1">Add, edit, and remove products from the catalog.</p>
          </div>
          <button 
            onClick={handleOpenAddModal}
            className="bg-[#FFD700] hover:bg-yellow-400 text-black font-bold px-6 py-3 rounded-xl shadow-sm transition flex items-center gap-2">
            + Add Product
          </button>
        </div>

        {/* Stats Cards (Figma Colors & Style) */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-[#1E1E1E] text-white p-6 rounded-2xl shadow-sm relative overflow-hidden">
            <div className="flex justify-between text-xs text-gray-400 mb-4">
              <span>Total Products</span>
              <span>↗</span>
            </div>
            <div className="text-4xl font-black">{products.length}</div>
            <div className="absolute right-4 bottom-4 opacity-10 text-6xl">📦</div>
          </div>
          <div className="bg-[#1E1E1E] text-white p-6 rounded-2xl shadow-sm relative overflow-hidden">
            <div className="flex justify-between text-xs text-gray-400 mb-4">
              <span>Out of Stock Items</span>
              <span>↗</span>
            </div>
            <div className="text-4xl font-black">
              {products.filter(p => p.stock === 0).length} <span className="text-sm font-normal text-gray-400">item</span>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between text-xs text-gray-500 mb-4">
              <span>Low Stock Items</span>
              <span>↗</span>
            </div>
            <div className="text-4xl font-black text-black">
              {products.filter(p => p.stock > 0 && p.stock <= 5).length} <span className="text-sm font-normal text-gray-500">items</span>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex gap-4 mb-8">
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search product" 
            className="flex-1 bg-white border border-gray-200 px-5 py-3 rounded-xl text-sm focus:outline-none focus:border-black shadow-sm"
          />
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-white border border-gray-200 px-6 py-3 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 shadow-sm focus:outline-none">
            <option value="All">All Categories</option>
            <option value="Apparel">Apparel</option>
            <option value="Jewelry">Jewelry</option>
            <option value="Accessories">Accessories</option>
            <option value="Footwear">Footwear</option>
          </select>
          <button 
            onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
            className="bg-white border border-gray-200 px-6 py-3 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 shadow-sm">
            Reset Filter
          </button>
        </div>

        {/* Products Table & Right side widgets */}
        <div className="grid grid-cols-3 gap-8">
          
          {/* Table Container (Figma Dark Header: bg-[#6B6B6B] or #555) */}
          <div className="col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#6B6B6B] text-white text-[11px] font-bold uppercase tracking-wider">
                  <th className="py-4 px-6">Product</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Price</th>
                  <th className="py-4 px-6">Stock</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-10 text-gray-400 font-medium">No products found matching your search.</td>
                  </tr>
                ) : (
                  filteredProducts.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition">
                      <td className="py-4 px-6 flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover border" />
                        <div>
                          <div className="font-bold text-black">{item.name}</div>
                          <div className="text-xs text-gray-400">{item.sku}</div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="border border-yellow-500/50 text-yellow-800 bg-yellow-50/50 px-3 py-1 rounded-full text-[10px] font-bold uppercase">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-bold text-black">LKR {item.price.toLocaleString()}</td>
                      <td className="py-4 px-6">
                        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md ${
                          item.stock > 10 ? 'bg-green-50 text-green-700' :
                          item.stock > 0 ? 'bg-yellow-50 text-yellow-800' : 'bg-red-50 text-red-600'
                        }`}>
                          {item.stock > 10 ? `IN STOCK (${item.stock})` : item.stock > 0 ? `LOW STOCK (${item.stock})` : `OUT OF STOCK (0)`}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <button 
                          onClick={() => handleOpenEditModal(item)}
                          className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-600 transition" title="Edit">
                          ✏️
                        </button>
                        <button 
                          onClick={() => confirmDelete(item.id)}
                          className="p-2 bg-red-50 hover:bg-red-100 rounded-lg text-red-600 transition" title="Delete">
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <div className="p-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500 bg-gray-50/30">
              <span>Showing {filteredProducts.length} of {products.length} luxury products</span>
              <div className="space-x-2">
                <button className="px-3 py-1 border rounded bg-white">Previous</button>
                <button className="px-3 py-1 bg-[#FFD700] text-black font-bold rounded">Next</button>
              </div>
            </div>
          </div>

          {/* Right Side Widgets (Figma Exact Colors: Donut Chart & Bar Chart) */}
          <div className="space-y-6">
            
            {/* Category Breakdown Donut Chart Box */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-base mb-4">Category Breakdown</h3>
              <div className="flex justify-center my-4 relative">
                <div className="w-36 h-36 rounded-full border-[14px] border-[#FFD700] border-r-[#6B6B6B] border-b-[#333333] flex items-center justify-center font-black text-base shadow-inner">
                  3 Classes
                </div>
              </div>
              <div className="space-y-2 text-xs font-medium pt-2">
                <div className="flex justify-between items-center"><span className="flex items-center gap-2"><span className="w-3 h-3 bg-[#FFD700] rounded-sm"></span> Apparel</span> <span>40%</span></div>
                <div className="flex justify-between items-center"><span className="flex items-center gap-2"><span className="w-3 h-3 bg-[#333333] rounded-sm"></span> Jewelry</span> <span>35%</span></div>
                <div className="flex justify-between items-center"><span className="flex items-center gap-2"><span className="w-3 h-3 bg-[#6B6B6B] rounded-sm"></span> Accessories</span> <span>25%</span></div>
              </div>
            </div>

            {/* Stock Value Trend Bar Chart Box */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-base mb-4">Stock Value Trend</h3>
              <div className="h-32 flex items-end justify-between gap-3 pt-4 px-2 border-b border-gray-100">
                {[
                  { month: 'Jan', h: '45%', col: 'bg-[#FFD700]' },
                  { month: 'Feb', h: '75%', col: 'bg-[#1E1E1E]' },
                  { month: 'Mar', h: '35%', col: 'bg-[#FFD700]' },
                  { month: 'Apr', h: '90%', col: 'bg-[#1E1E1E]' },
                  { month: 'May', h: '65%', col: 'bg-[#FFD700]' },
                  { month: 'Jun', h: '100%', col: 'bg-[#1E1E1E]' },
                ].map((bar, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 flex-1 h-full justify-end">
                    <div className={`w-full rounded-t-md ${bar.col} transition-all duration-300 hover:opacity-80`} style={{ height: bar.h }}></div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-gray-400 font-bold pt-2 px-1">
                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* --- ADD / EDIT PRODUCT MODAL --- */}
      {modalMode && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-xl p-8 rounded-3xl shadow-2xl relative animate-scaleUp">
            <button 
              onClick={() => setModalMode(null)}
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500 hover:bg-gray-200">
              ✕
            </button>

            <h2 className="text-2xl font-black mb-1">{modalMode === 'add' ? 'Add New Product' : 'Update Product'}</h2>
            <p className="text-xs text-gray-400 mb-6">HOUSE OF SALAGA — INVENTORY MANAGER</p>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Product name *</label>
                <input 
                  type="text" 
                  required
                  value={currentProduct.name}
                  onChange={(e) => setCurrentProduct({...currentProduct, name: e.target.value})}
                  placeholder="e.g. Adire wrap dress" 
                  className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Category *</label>
                  <select 
                    value={currentProduct.category}
                    onChange={(e) => setCurrentProduct({...currentProduct, category: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-black">
                    <option value="Apparel">Apparel</option>
                    <option value="Jewelry">Jewelry</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Footwear">Footwear</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">SKU</label>
                  <input 
                    type="text" 
                    disabled 
                    value="Generated on save" 
                    className="w-full bg-gray-100 border border-gray-200 px-4 py-3 rounded-xl text-sm text-gray-400 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Price (LKR) *</label>
                  <input 
                    type="number" 
                    required
                    value={currentProduct.price}
                    onChange={(e) => setCurrentProduct({...currentProduct, price: Number(e.target.value)})}
                    placeholder="12500" 
                    className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Stock quantity *</label>
                  <input 
                    type="number" 
                    required
                    value={currentProduct.stock}
                    onChange={(e) => setCurrentProduct({...currentProduct, stock: Number(e.target.value)})}
                    placeholder="14" 
                    className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Product Image URL</label>
                <input 
                  type="text" 
                  value={currentProduct.image}
                  onChange={(e) => setCurrentProduct({...currentProduct, image: e.target.value})}
                  placeholder="https://images.unsplash.com/..." 
                  className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
                <textarea 
                  rows="3"
                  value={currentProduct.description}
                  onChange={(e) => setCurrentProduct({...currentProduct, description: e.target.value})}
                  placeholder="Short product description"
                  className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-black"></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button 
                  type="button" 
                  onClick={() => setModalMode(null)}
                  className="px-6 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50">
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-6 py-2.5 rounded-xl bg-[#FFD700] hover:bg-yellow-400 text-black text-sm font-bold transition shadow-sm">
                  {modalMode === 'add' ? 'Save Product' : 'Update Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- DELETE CONFIRMATION MODAL --- */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-sm p-6 rounded-3xl shadow-xl text-center">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">⚠️</div>
            <h3 className="text-lg font-bold mb-2">Are you sure?</h3>
            <p className="text-xs text-gray-500 mb-6">Do you really want to remove this product from the inventory catalog? This action cannot be undone.</p>
            <div className="flex justify-center gap-3">
              <button 
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50">
                Cancel
              </button>
              <button 
                onClick={executeDelete}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition">
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}