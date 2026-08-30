import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside style={styles.sidebar}>
      <div>
        <h2 style={styles.brandTitle}>House of Salaga</h2>
        <p style={styles.brandSubtitle}>LUXURY HERITAGE WEAR</p>

        <nav style={styles.nav}>
          <div 
            style={{ ...styles.navItem, ...(isActive('/') ? styles.activeNavItem : {}) }}
            onClick={() => navigate('/')}
          >
            <span>🏠</span> Home Collection
          </div>

          <div style={styles.navItem}>
            <span>🛍️</span> All Product
          </div>

          <div 
            style={{ ...styles.navItem, ...(isActive('/order-history') ? styles.activeNavItem : {}) }}
            onClick={() => navigate('/order-history')}
          >
            <span>📦</span> My Orders
          </div>

          <div style={styles.navItem}>
            <span>🤍</span> My Wishlist
          </div>

          <div 
            style={{ 
              ...styles.navItem, 
              ...(isActive('/checkout') || isActive('/payment') || isActive('/order-summary') ? styles.activeNavItem : {}) 
            }}
            onClick={() => navigate('/checkout')}
          >
            <span>🛒</span> Shopping Cart
          </div>

          <div style={styles.navItem}>
            <span>⭐</span> Reviews & Ratings
          </div>

          <div 
            style={{ ...styles.navItem, ...(isActive('/profile') ? styles.activeNavItem : {}) }}
            onClick={() => navigate('/profile')}
          >
            <span>👤</span> My Profile
          </div>
        </nav>
      </div>

      {/* User Profile Footer - Name Updated */}
      <div style={styles.userSection}>
        <div style={styles.avatar}></div>
        <div>
          <div style={styles.userName}>Thrishala Weerasekara</div>
          <div style={styles.signOut}>Sign Out</div>
        </div>
      </div>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: '240px',
    backgroundColor: '#000000',
    color: '#ffffff',
    padding: '30px 20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '100vh',
    boxSizing: 'border-box',
  },
  brandTitle: { fontSize: '18px', margin: 0, fontWeight: 'bold', color: '#f5b000' },
  brandSubtitle: { fontSize: '9px', color: '#888', marginTop: '4px', letterSpacing: '1px' },
  nav: { marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '8px' },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 15px',
    borderRadius: '8px',
    fontSize: '13px',
    color: '#ccc',
    cursor: 'pointer',
    transition: '0.2s',
  },
  activeNavItem: {
    backgroundColor: '#1a1a1a',
    color: '#f5b000',
    fontWeight: 'bold',
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    paddingTop: '20px',
    borderTop: '1px solid #222',
  },
  avatar: {
    width: '35px',
    height: '35px',
    borderRadius: '50%',
    backgroundColor: '#c9a159',
  },
  userName: { fontSize: '12px', fontWeight: 'bold', color: '#fff' },
  signOut: { fontSize: '10px', color: '#ff4d4d', cursor: 'pointer', marginTop: '2px' },
};