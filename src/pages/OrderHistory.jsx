import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

export default function OrderHistory() {
  const [activeTab, setActiveTab] = useState('All orders');

  const ordersData = [
    {
      id: 1,
      name: 'Luxury Handwoven Linen Shirt',
      price: '6500.00',
      status: 'Delivered',
      category: 'Completed',
      icon: '👕',
    },
    {
      id: 2,
      name: 'Premium Designer Leather Heels',
      price: '5990.00',
      status: 'Delivered',
      category: 'Completed',
      icon: '👠',
    },
    {
      id: 3,
      name: 'Elegance Italian Leather Handbag',
      price: '4900.00',
      status: 'Pending',
      category: 'Pending',
      icon: '👜',
    },
    {
      id: 4,
      name: 'Signature Tailored Blazer',
      price: '14900.00',
      status: 'Canceled',
      category: 'Canceled',
      icon: '🧥',
    },
  ];

  const filteredOrders = ordersData.filter((order) => {
    if (activeTab === 'All orders') return true;
    return order.category === activeTab;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return '#2e7d32';
      case 'Pending':
        return '#e65100';
      case 'Canceled':
        return '#c62828';
      default:
        return '#000';
    }
  };

  return (
    <div style={{ display: 'flex', backgroundColor: '#f3f3f3', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '40px 60px' }}>
        
        {/* Title - කළු පාටට වෙනස් කරන ලදී */}
        <h1 style={{ textAlign: 'center', color: '#000000', fontSize: '28px', marginBottom: '30px', fontWeight: 'bold' }}>
          Order History
        </h1>

        {/* Top Header & Filter Tabs */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <div style={{ display: 'flex', gap: '25px' }}>
            {['All orders', 'Pending', 'Completed', 'Canceled'].map((tab) => (
              <span
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  cursor: 'pointer',
                  fontWeight: activeTab === tab ? 'bold' : '600',
                  color: activeTab === tab ? '#f5b000' : '#111111',
                  borderBottom: activeTab === tab ? '2px solid #f5b000' : 'none',
                  paddingBottom: '5px',
                  fontSize: '15px',
                  transition: '0.2s',
                }}
              >
                {tab}
              </span>
            ))}
          </div>

          <button style={invoiceBtnStyle}>View Invoice</button>
        </div>

        {/* Table Header */}
        <div style={tableHeaderStyle}>
          <span style={{ flex: 2 }}>Item</span>
          <span style={{ flex: 1, textAlign: 'center' }}>Total</span>
          <span style={{ flex: 1, textAlign: 'right' }}>Status</span>
        </div>

        {/* Table Rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((item) => (
              <div key={item.id} style={itemRowStyle}>
                <div style={{ flex: 2, display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={iconBoxStyle}>{item.icon}</div>
                  {/* Item Name - තද කළු පාට කරන ලදී */}
                  <span style={{ fontWeight: 'bold', color: '#000000', fontSize: '15px' }}>{item.name}</span>
                </div>
                {/* Total Price - තද කළු පාට කරන ලදී */}
                <div style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', color: '#000000' }}>
                  {item.price}
                </div>
                <div
                  style={{
                    flex: 1,
                    textAlign: 'right',
                    fontWeight: 'bold',
                    color: getStatusColor(item.status),
                  }}
                >
                  {item.status}
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: '#555', fontWeight: 'bold' }}>
              No orders found in this category.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

const invoiceBtnStyle = {
  backgroundColor: '#f5b000',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '8px',
  fontWeight: 'bold',
  color: '#000',
  cursor: 'pointer',
  fontSize: '14px',
};

const tableHeaderStyle = {
  display: 'flex',
  backgroundColor: '#e6e6e6',
  padding: '15px 30px',
  borderRadius: '12px',
  fontWeight: 'bold',
  color: '#000',
  marginBottom: '15px',
  fontSize: '15px',
};

const itemRowStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '15px 30px',
  borderBottom: '1px dashed #ccc',
};

const iconBoxStyle = {
  width: '50px',
  height: '50px',
  backgroundColor: '#fff',
  borderRadius: '12px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '24px',
  boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
};