import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. useNavigate import කළා
import Sidebar from '../components/Sidebar';

export default function Checkout() {
  const navigate = useNavigate(); // 2. navigate function එක සාදාගත්තා

  const [deliveryMethod, setDeliveryMethod] = useState('standard');

  const [formData, setFormData] = useState({
    firstName: 'Amara',
    lastName: 'Silva',
    address: '42 Gall Road, Colombo 03',
    city: 'Colombo',
    postalCode: '00300',
    phone: '+94 77 247 4556',
  });

  const cartItems = [
    { 
      id: 1, 
      name: "Men's Premium Dress Shirt", 
      desc: 'Navy Micro-Patterned Cotton - Qty 1', 
      price: 6700, 
      img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=150' 
    },
    { 
      id: 2, 
      name: 'Rolex Datejust Automatic Watch', 
      desc: 'Stainless Steel & 18k Yellow Gold - Qty 1', 
      price: 25000, 
      img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=150' 
    },
    { 
      id: 3, 
      name: 'Designer Leather Top-Handle Bag', 
      desc: 'Off-White / Gold Hardware - Qty 1', 
      price: 6200, 
      img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=150' 
    },
  ];

  const subtotal = 37900;
  const shipping = deliveryMethod === 'standard' ? 1650 : 2500;
  const total = subtotal + shipping;

  return (
    <div style={styles.container}>
      {/* 1. Sidebar */}
      <Sidebar />

      {/* 2. Main Content */}
      <main style={styles.main}>
        <h1 style={styles.heading}>Checkout</h1>
        <p style={styles.subHeading}>Review your delivery details, select secure payment methods, and complete your order..</p>
        <hr style={styles.divider} />

        {/* Stepper Progress Bar */}
        <div style={styles.stepperContainer}>
          <div style={styles.stepGroup}>
            <div style={styles.stepCompleted}>1</div>
            <span style={styles.stepTextActive}>Cart</span>
          </div>
          <div style={styles.lineCompleted} />
          <div style={styles.stepGroup}>
            <div style={styles.stepActive}>2</div>
            <span style={styles.stepTextActive}>Delivery</span>
          </div>
          <div style={styles.lineInactive} />
          <div style={styles.stepGroup}>
            <div style={styles.stepInactive}>3</div>
            <span style={styles.stepText}>Payment</span>
          </div>
          <div style={styles.lineInactive} />
          <div style={styles.stepGroup}>
            <div style={styles.stepInactive}>4</div>
            <span style={styles.stepText}>Confirm</span>
          </div>
        </div>

        {/* Layout Grid */}
        <div style={styles.grid}>
          {/* Left Card: Delivery Details */}
          <div style={styles.card}>
            <h3 style={styles.cardHeader}>Delivery Details</h3>

            <div style={styles.twoCol}>
              <div>
                <label style={styles.label}>FIRST NAME</label>
                <input
                  style={styles.input}
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div>
                <label style={styles.label}>LAST NAME</label>
                <input
                  style={styles.input}
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>DELIVERY ADDRESS</label>
              <input
                style={styles.input}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>

            <div style={styles.twoCol}>
              <div>
                <label style={styles.label}>CITY</label>
                <input
                  style={styles.input}
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>
              <div>
                <label style={styles.label}>POSTAL CODE</label>
                <input
                  style={styles.input}
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>PHONE NUMBER</label>
              <input
                style={styles.input}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <label style={styles.label}>DELIVERY METHOD</label>
            <div style={styles.deliveryGrid}>
              <div
                style={{
                  ...styles.radioOption,
                  border: deliveryMethod === 'standard' ? '1.5px solid #f5b000' : '1px solid #e0e0e0',
                }}
                onClick={() => setDeliveryMethod('standard')}
              >
                <input type="radio" checked={deliveryMethod === 'standard'} readOnly />
                <div>
                  <div style={styles.radioTitle}>Standard Delivery</div>
                  <div style={styles.radioSub}>3-5 business days</div>
                </div>
                <span style={styles.radioPrice}>LKR 1650</span>
              </div>

              <div
                style={{
                  ...styles.radioOption,
                  border: deliveryMethod === 'express' ? '1.5px solid #f5b000' : '1px solid #e0e0e0',
                }}
                onClick={() => setDeliveryMethod('express')}
              >
                <input type="radio" checked={deliveryMethod === 'express'} readOnly />
                <div>
                  <div style={styles.radioTitle}>Express Delivery</div>
                  <div style={styles.radioSub}>1-2 business days</div>
                </div>
                <span style={styles.radioPrice}>LKR 2500</span>
              </div>
            </div>

            {/* 3. Button එකේ onClick එකට navigate('/payment') එකතු කළා */}
            <button 
              style={styles.submitBtn} 
              onClick={() => navigate('/payment')}
            >
              CONTINUE TO PAYMENT ➔
            </button>
          </div>

          {/* Right Card: Your Order */}
          <div style={styles.card}>
            <h3 style={styles.cardHeader}>Your Order</h3>

            <div style={styles.itemList}>
              {cartItems.map((item) => (
                <div key={item.id} style={styles.itemRow}>
                  <img src={item.img} alt={item.name} style={styles.itemImg} />
                  <div style={{ flex: 1 }}>
                    <div style={styles.itemName}>{item.name}</div>
                    <div style={styles.itemDesc}>{item.desc}</div>
                  </div>
                  <div style={styles.itemPrice}>LKR {item.price}</div>
                </div>
              ))}
            </div>

            <hr style={styles.summaryDivider} />

            <div style={styles.summaryRow}>
              <span>Subtotal</span>
              <strong>LKR {subtotal}</strong>
            </div>
            <div style={styles.summaryRow}>
              <span>Shipping</span>
              <strong>LKR {shipping}</strong>
            </div>

            <div style={styles.totalRow}>
              <span>Total</span>
              <span>LKR {total}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: { display: 'flex', minHeight: '100vh', backgroundColor: '#f9f9f9', fontFamily: 'sans-serif' },
  main: { flex: 1, padding: '40px 50px', color: '#111' },
  heading: { fontSize: '28px', color: '#111', margin: '0 0 5px 0', textAlign: 'center' },
  subHeading: { fontSize: '13px', color: '#666', textAlign: 'center', margin: '0 0 20px 0' },
  divider: { border: 'none', borderTop: '1px dashed #ddd', marginBottom: '30px' },

  stepperContainer: { display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '35px' },
  stepGroup: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' },
  stepCompleted: { width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#f5b000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' },
  stepActive: { width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' },
  stepInactive: { width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#e0e0e0', color: '#666', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' },
  lineCompleted: { width: '60px', height: '2px', backgroundColor: '#f5b000', margin: '0 8px' },
  lineInactive: { width: '60px', height: '2px', backgroundColor: '#e0e0e0', margin: '0 8px' },
  stepTextActive: { fontSize: '11px', color: '#000', fontWeight: 'bold' },
  stepText: { fontSize: '11px', color: '#888' },

  grid: { display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '25px', alignItems: 'start' },
  card: { backgroundColor: '#ffffff', borderRadius: '12px', padding: '25px', border: '1px solid #e2e2e2', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' },
  cardHeader: { fontSize: '16px', textAlign: 'center', marginBottom: '20px', color: '#222', fontWeight: '600' },

  formGroup: { marginBottom: '15px' },
  twoCol: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '15px' },
  label: { display: 'block', fontSize: '10px', fontWeight: 'bold', marginBottom: '6px', color: '#444', letterSpacing: '0.5px' },
  
  input: {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    backgroundColor: '#ffffff',
    color: '#000000',
    fontSize: '13px',
    boxSizing: 'border-box',
    outline: 'none',
  },

  deliveryGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '25px' },
  radioOption: { display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', borderRadius: '6px', cursor: 'pointer', backgroundColor: '#fff' },
  radioTitle: { fontWeight: 'bold', fontSize: '12px', color: '#111' },
  radioSub: { fontSize: '10px', color: '#666' },
  radioPrice: { fontSize: '11px', fontWeight: 'bold', marginLeft: 'auto', color: '#111' },

  submitBtn: { width: '100%', backgroundColor: '#f5b000', color: '#000', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer', marginTop: '10px' },

  itemList: { display: 'flex', flexDirection: 'column', gap: '15px' },
  itemRow: { display: 'flex', gap: '12px', alignItems: 'center' },
  itemImg: { width: '50px', height: '50px', borderRadius: '6px', objectFit: 'cover', border: '1px solid #eee' },
  itemName: { fontWeight: 'bold', fontSize: '12px', color: '#111' },
  itemDesc: { fontSize: '10px', color: '#666' },
  itemPrice: { fontWeight: 'bold', fontSize: '12px', color: '#111' },

  summaryDivider: { border: 'none', borderTop: '1px solid #eee', margin: '20px 0' },
  summaryRow: { display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#444', marginBottom: '10px' },
  totalRow: { display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: 'bold', color: '#000', marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #eee' },
};