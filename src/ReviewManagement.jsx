import React, { useState } from 'react';

export default function ReviewManagement() {
  const [reviews, setReviews] = useState([
    { id: 1, product: 'Silk Wrap Midi Dress', customer: 'Amara Perera', rating: '★★★★★', review: 'Absolutely stunning piece', date: 'Nov 12, 2024', status: 'Approved' },
    { id: 2, product: 'Linen Oversized Blazer', customer: 'Kavitha Ratnayake', rating: '★★★★★', review: 'Beautiful blazer, very well-made.', date: 'Nov 10, 2024', status: 'Approved' },
    { id: 3, product: 'Embroidered Crop Top', customer: 'Nishadi J.', rating: '★★★★★', review: 'Terrible quality.', date: 'Nov 08, 2024', status: 'Pending' },
    { id: 4, product: 'Wide-Leg Palazzo Pants', customer: 'Priya Mendis', rating: '★★★★★', review: 'Love these pants !', date: 'Nov 07, 2024', status: 'Approved' },
    { id: 5, product: 'Woven Raffia Tote Bag', customer: 'Tharushi Fernando', rating: '★★★★★', review: 'The bag is okay but smaller than photos.', date: 'Nov 05, 2024', status: 'Pending' },
  ]);

  const [filter, setFilter] = useState('All');

  const handleStatusChange = (id, newStatus) => {
    setReviews(reviews.map(item => item.id === id ? { ...item, status: newStatus } : item));
  };

  const handleDelete = (id) => {
    setReviews(reviews.filter(item => item.id !== id));
  };

  const filteredReviews = reviews.filter(item => {
    if (filter === 'All') return true;
    return item.status.toLowerCase() === filter.toLowerCase();
  });

  const totalReviews = reviews.length;
  const pendingCount = reviews.filter(r => r.status === 'Pending').length;
  const approvedCount = reviews.filter(r => r.status === 'Approved').length;
  const removedCount = reviews.filter(r => r.status === 'Removed').length;

  return (
    <div className="flex min-h-screen bg-[#F4F4F4] font-sans text-gray-900">
      
      {/* Left Sidebar */}
      <aside className="w-72 bg-black text-white flex flex-col justify-between p-6 fixed h-full z-10">
        <div>
          <div className="mb-10">
            <h2 className="font-black text-lg tracking-wide uppercase text-[#FFD700]">HOUSE OF SALAGA</h2>
            <p className="text-[10px] text-gray-400 tracking-widest uppercase">LUXURY HERITAGE WEAR</p>
          </div>

          <nav className="space-y-4 text-sm font-medium">
            <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-white transition py-2"><span>📦</span> Orders</a>
            <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-white transition py-2"><span>👥</span> Users</a>
            <a href="#" className="flex items-center gap-3 bg-[#1A1A1A] text-[#FFD700] px-4 py-3 rounded-xl font-bold border-l-4 border-[#FFD700]"><span>⭐</span> Review Management</a>
            <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-white transition py-2"><span>📊</span> Sales Analytics</a>
            <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-white transition py-2"><span>⚙️</span> Settings</a>
          </nav>
        </div>

        <div className="bg-[#121212] p-4 rounded-xl flex items-center justify-between border border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FFD700] text-black font-black flex items-center justify-center">AU</div>
            <div>
              <h4 className="text-sm font-bold text-white">Admin User</h4>
              <span className="text-[11px] text-red-500 font-medium cursor-pointer">Sign Out</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="ml-72 flex-1 p-10 max-w-[1200px] overflow-x-auto">
        
        <div className="mb-8">
          <h1 className="text-3xl font-black text-black tracking-tight">Review Moderation</h1>
          <p className="text-sm text-gray-500 mt-1">Approve, reject, or manage customer product reviews</p>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <h4 className="text-sm font-bold text-gray-600 mb-2">Total Reviews</h4>
            <span className="text-4xl font-black text-black">{totalReviews}</span>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <h4 className="text-sm font-bold text-gray-600 mb-2">Pending</h4>
            <span className="text-4xl font-black text-black">{pendingCount}</span>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <h4 className="text-sm font-bold text-gray-600 mb-2">Approved</h4>
            <span className="text-4xl font-black text-black">{approvedCount}</span>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <h4 className="text-sm font-bold text-gray-600 mb-2">Removed</h4>
            <span className="text-4xl font-black text-black">{removedCount}</span>
          </div>
        </div>

        <div className="flex gap-3 mb-8">
          {['All', 'Pending', 'Approved', 'Removed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition ${
                filter === tab 
                  ? 'bg-[#FFD700] text-black shadow-sm' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-max">
            <thead>
              <tr className="border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <th className="py-4 px-6">Product</th>
                <th className="py-4 px-6">Customer</th>
                <th className="py-4 px-6">Rating</th>
                <th className="py-4 px-6">Review</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right min-w-[200px]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredReviews.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-gray-400 font-medium">No reviews found.</td>
                </tr>
              ) : (
                filteredReviews.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition">
                    <td className="py-4 px-6 font-bold text-black">{item.product}</td>
                    <td className="py-4 px-6 text-gray-600">{item.customer}</td>
                    <td className="py-4 px-6 text-yellow-500 tracking-tighter">{item.rating}</td>
                    <td className="py-4 px-6 text-gray-700 max-w-xs truncate">{item.review}</td>
                    <td className="py-4 px-6 text-gray-500 text-xs">{item.date}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        item.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex flex-row items-center justify-end gap-2 w-full">
                        {item.status === 'Approved' ? (
                          <button 
                            onClick={() => handleStatusChange(item.id, 'Pending')}
                            className="bg-[#FEF08A] hover:bg-yellow-200 text-yellow-900 text-xs font-bold px-3 py-1.5 rounded-lg transition whitespace-nowrap flex-shrink-0">
                            Moderate
                          </button>
                        ) : (
                          <button 
                            onClick={() => handleStatusChange(item.id, 'Approved')}
                            className="bg-[#BBF7D0] hover:bg-green-200 text-green-800 text-xs font-bold px-3 py-1.5 rounded-lg transition whitespace-nowrap flex-shrink-0">
                            Approve
                          </button>
                        )}
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="bg-[#FFE4E6] hover:bg-red-200 text-red-600 text-xs font-bold px-3 py-1.5 rounded-lg transition whitespace-nowrap flex-shrink-0">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </main>
    </div>
  );
}