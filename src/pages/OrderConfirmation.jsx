import React from 'react';
import Sidebar from '../components/Sidebar';

export default function OrderConfirmation() {
  const orderItems = [
    { id: 1, name: "Men's Premium Dress Shirt", desc: "Navy Micro-Patterned Cotton - Qty 1", price: 6700, img: "https://via.placeholder.com/50" },
    { id: 2, name: "Rolex Datejust Automatic Watch", desc: "Stainless Steel & 18k Yellow Gold - Qty 1", price: 25000, img: "https://via.placeholder.com/50" },
    { id: 3, name: "Designer Leather Top-Handle Bag", desc: "Off-White / Gold Hardware - Qty 1", price: 6200, img: "https://via.placeholder.com/50" },
  ];

  return (
    <div style={{ display: 'flex', backgroundColor: '#f9f9f9', minHeight: '100vh', fontFamily: 'serif' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '40px 100px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Dark Banner */}
        <div style={bannerCard}>
          <div style={checkCircle}>✓</div>
          <h1 style={{ color: '#fff', fontSize: '28px', margin: '15px 0 8px 0', fontFamily: 'sans-serif' }}>Order Confirmed!</h1>
          <p style={{ color: '#ccc', fontSize: '13px', margin: 0 }}>Thank you for your order, Amara! 🎉</p>
          <div style={{ color: '#c59b27', fontWeight: 'bold', marginTop: '15px', fontSize: '14px' }}>
            Order ID <span style={{ textDecoration: 'underline' }}>#SZ-2026-89341</span>
          </div>
          <div style={{ color: '#777', fontSize: '11px', marginTop: '10px' }}>A receipt has been sent to amara@email.com</div>
        </div>

        {/* Items Ordered List */}
        <div style={detailBox}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
            <span style={{ fontWeight: 'bold', fontSize: '14px' }}>Items Ordered</span>
            <span style={{ color: '#666', fontSize: '13px' }}>3 items</span>
          </div>

          {orderItems.map((item) => (
            <div key={item.id} style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '12px' }}>
              <img src={item.img} alt={item.name} style={{ width: '45px', height: '45px', borderRadius: '6px' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold', fontSize: '13px' }}>{item.name}</div>
                <div style={{ fontSize: '11px', color: '#777' }}>{item.desc}</div>
              </div>
              <div style={{ fontWeight: 'bold', fontSize: '13px' }}>LKR {item.price}</div>
            </div>
          ))}

          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '15px', borderTop: '1px solid #eee', marginTop: '10px' }}>
            <strong>Total</strong>
            <strong>LKR 39550</strong>
          </div>
        </div>

        {/* Delivery Details Block */}
        <div style={{ ...detailBox, display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          <div>
            <div style={{ fontSize: '11px', color: '#777', fontWeight: 'bold', marginBottom: '5px' }}>Delivering To</div>
            <div style={{ fontSize: '13px', fontWeight: 'bold' }}>Amara Silva</div>
            <div style={{ fontSize: '12px', color: '#555' }}>42 Galle Road, Colombo 03</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#777', fontWeight: 'bold', marginBottom: '5px' }}>Estimated Delivery</div>
            <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#000' }}>Aug 15–17, 2026</div>
            <div style={{ fontSize: '11px', color: '#777' }}>Standard Shipping - 3-5 days</div>
          </div>
        </div>

        {/* Order Status Stepper */}
        <div style={detailBox}>
          <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '15px' }}>Order Status</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={statusNode}><div style={activeDot}>✓</div><span style={{ fontSize: '10px' }}>Confirmed</span></div>
            <div style={statusLine} />
            <div style={statusNode}><div style={inactiveDot} /><span style={{ fontSize: '10px', color: '#aaa' }}>Processing</span></div>
            <div style={statusLine} />
            <div style={statusNode}><div style={inactiveDot} /><span style={{ fontSize: '10px', color: '#aaa' }}>Shipped</span></div>
            <div style={statusLine} />
            <div style={statusNode}><div style={inactiveDot} /><span style={{ fontSize: '10px', color: '#aaa' }}>Delivered</span></div>
          </div>
        </div>

        <button style={{ ...goldButton, width: '600px', marginTop: '20px' }}>CONTINUE SHOPPING ➔</button>
      </div>
    </div>
  );
}

const bannerCard = { backgroundColor: '#1c1c1c', borderRadius: '12px', padding: '30px', textAlign: 'center', width: '600px', boxSizing: 'border-box', marginBottom: '20px' };
const checkCircle = { width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#c59b27', color: '#fff', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' };
const detailBox = { backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '10px', padding: '20px', width: '600px', boxSizing: 'border-box', marginBottom: '15px' };
const statusNode = { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' };
const activeDot = { width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#c59b27', color: '#fff', fontSize: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' };
const inactiveDot = { width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#e0e0e0' };
const statusLine = { flex: 1, height: '2px', backgroundColor: '#e0e0e0', margin: '0 8px' };
const goldButton = { backgroundColor: '#c59b27', color: '#fff', border: 'none', padding: '14px', borderRadius: '6px', fontWeight: 'bold', letterSpacing: '1px', cursor: 'pointer' };