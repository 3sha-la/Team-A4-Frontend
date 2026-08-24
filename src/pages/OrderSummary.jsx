import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function OrderSummary() {
  const navigate = useNavigate();

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

  return (
    <div style={styles.container}>
      {/* 1. Sidebar */}
      <Sidebar />

      {/* 2. Main Content */}
      <main style={styles.main}>
        <div style={styles.contentWrapper}>
          
          {/* Black Banner Box */}
          <div style={styles.bannerCard}>
            <div style={styles.checkBadge}>✓</div>
            <h1 style={styles.bannerTitle}>Order Confirmed!</h1>
            <p style={styles.bannerSub}>Thank you for your order, Amara! 🎉</p>
            <p style={styles.orderId}>
              Order ID <span style={styles.orderIdHighlight}>#SZ-2026-89341</span>
            </p>
            <p style={styles.emailNote}>A receipt has been sent to amara@email.com</p>
          </div>

          {/* Items Ordered Card */}
          <div style={styles.card}>
            <div style={styles.cardHeaderRow}>
              <span style={styles.cardTitle}>Items Ordered</span>
              <span style={styles.itemCount}>3 items</span>
            </div>

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

            <hr style={styles.divider} />

            <div style={styles.totalRow}>
              <span>Total</span>
              <span>LKR 39550</span>
            </div>
          </div>

          {/* Delivery & Estimated Date Grid */}
          <div style={styles.twoColGrid}>
            <div style={styles.subCard}>
              <span style={styles.subCardLabel}>Delivering To</span>
              <div style={styles.addressText}>
                <strong>Amara Silva</strong>
                <br />
                42 Gall Road,
                <br />
                Colombo 03
              </div>
            </div>

            <div style={styles.subCard}>
              <span style={styles.subCardLabel}>Estimated Delivery</span>
              <div style={styles.deliveryDate}>Aug 15 - 17, 2026</div>
              <div style={styles.shippingMethod}>Standard Shipping - 500</div>
            </div>
          </div>

          {/* Order Status Stepper */}
          <div style={styles.statusCard}>
            <span style={styles.subCardLabel}>Order Status</span>
            
            <div style={styles.statusStepper}>
              <div style={styles.statusStep}>
                <div style={styles.statusCheckActive}>✓</div>
                <span style={styles.statusTextActive}>Confirmed</span>
              </div>
              
              <div style={styles.statusLine} />
              
              <div style={styles.statusStep}>
                <div style={styles.statusDot} />
                <span style={styles.statusText}>Processing</span>
              </div>
              
              <div style={styles.statusLine} />
              
              <div style={styles.statusStep}>
                <div style={styles.statusDot} />
                <span style={styles.statusText}>Shipped</span>
              </div>
              
              <div style={styles.statusLine} />
              
              <div style={styles.statusStep}>
                <div style={styles.statusDot} />
                <span style={styles.statusText}>Delivered</span>
              </div>
            </div>
          </div>

          {/* Continue Shopping Button */}
          <button 
            style={styles.continueBtn} 
            onClick={() => navigate('/')}
          >
            CONTINUE SHOPPING ➔
          </button>

        </div>
      </main>
    </div>
  );
}

const styles = {
  container: { display: 'flex', minHeight: '100vh', backgroundColor: '#f9f9f9', fontFamily: 'sans-serif' },
  main: { flex: 1, padding: '40px 20px', display: 'flex', justifyContent: 'center' },
  contentWrapper: { width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '15px' },

  bannerCard: {
    backgroundColor: '#1a1a1a',
    color: '#ffffff',
    borderRadius: '12px',
    padding: '30px 20px',
    textAlign: 'center',
  },
  checkBadge: {
    width: '32px',
    height: '32px',
    backgroundColor: '#f5b000',
    color: '#111',
    borderRadius: '50%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  bannerTitle: { fontSize: '24px', margin: '0 0 6px 0', fontWeight: 'bold' },
  bannerSub: { fontSize: '12px', color: '#ccc', margin: '0 0 15px 0' },
  orderId: { fontSize: '11px', color: '#aaa', margin: '0 0 15px 0' },
  orderIdHighlight: { color: '#f5b000', fontWeight: 'bold' },
  emailNote: { fontSize: '10px', color: '#888', margin: 0 },

  card: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '20px',
    border: '1px solid #e5e5e5',
  },
  cardHeaderRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '15px' },
  cardTitle: { fontSize: '12px', fontWeight: 'bold', color: '#222' },
  itemCount: { fontSize: '11px', color: '#666' },

  itemList: { display: 'flex', flexDirection: 'column', gap: '12px' },
  itemRow: { display: 'flex', gap: '12px', alignItems: 'center' },
  itemImg: { width: '45px', height: '45px', borderRadius: '6px', objectFit: 'cover', border: '1px solid #eee' },
  itemName: { fontSize: '11px', fontWeight: 'bold', color: '#222' },
  itemDesc: { fontSize: '9px', color: '#777' },
  itemPrice: { fontSize: '11px', fontWeight: 'bold', color: '#111' },

  divider: { border: 'none', borderTop: '1px solid #eee', margin: '15px 0' },
  totalRow: { display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 'bold', color: '#111' },

  twoColGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' },
  subCard: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '15px',
    border: '1px solid #e5e5e5',
  },
  subCardLabel: { fontSize: '10px', color: '#888', display: 'block', marginBottom: '8px' },
  addressText: { fontSize: '11px', color: '#333', lineHeight: '1.4' },
  deliveryDate: { fontSize: '13px', fontWeight: 'bold', color: '#111', marginBottom: '2px' },
  shippingMethod: { fontSize: '9px', color: '#777' },

  statusCard: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '15px 20px',
    border: '1px solid #e5e5e5',
  },
  statusStepper: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' },
  statusStep: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' },
  statusCheckActive: {
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    backgroundColor: '#f5b000',
    color: '#fff',
    fontSize: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusDot: { width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#e0e0e0' },
  statusLine: { flex: 1, height: '2px', backgroundColor: '#e0e0e0', margin: '0 6px', marginTop: '-12px' },
  statusTextActive: { fontSize: '9px', color: '#111', fontWeight: 'bold' },
  statusText: { fontSize: '9px', color: '#999' },

  continueBtn: {
    width: '100%',
    backgroundColor: '#c9a159',
    color: '#000',
    border: 'none',
    padding: '12px',
    borderRadius: '6px',
    fontWeight: 'bold',
    fontSize: '11px',
    cursor: 'pointer',
    letterSpacing: '0.5px',
    marginTop: '5px',
  },
};