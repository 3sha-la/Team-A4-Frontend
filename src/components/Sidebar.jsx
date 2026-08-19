import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: 'My Profile', path: '/profile', icon: '👤' },
    { name: 'Order History', path: '/order-history', icon: '🛍️' },
    { name: 'Wishlist', path: '/wishlist', icon: '🤍' },
    { name: 'My Reviews', path: '/reviews', icon: '✏️' },
    { name: 'Delete Account', path: '/delete-account', icon: '🗑️' },
  ];

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.brandTitle}>House of Salaga</h2>

      <div style={styles.menuContainer}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              style={{
                ...styles.menuItem,
                ...(isActive ? styles.activeMenuItem : {}),
              }}
            >
              <span style={styles.icon}>{item.icon}</span>
              <span style={{ color: isActive ? '#f5b000' : '#ccc', fontWeight: isActive ? '600' : 'normal' }}>
                {item.name}
              </span>
              {isActive && <div style={styles.activeIndicator} />}
            </Link>
          );
        })}
      </div>

      <div style={styles.userSection}>
        <div style={styles.userAvatar} />
        <div>
          <div style={styles.userName}>User</div>
          <div style={styles.signOut}>Sign Out</div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  sidebar: {
    width: '260px',
    backgroundColor: '#000000',
    minHeight: '100vh',
    padding: '30px 20px',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    fontFamily: 'sans-serif'
  },
  brandTitle: {
    color: '#f5b000',
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '40px',
    marginTop: '10px'
  },
  menuContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    flexGrow: 1
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 15px',
    borderRadius: '8px',
    textDecoration: 'none',
    position: 'relative',
    transition: '0.3s'
  },
  activeMenuItem: {
    backgroundColor: '#111111',
    border: '1px solid #222222'
  },
  activeIndicator: {
    position: 'absolute',
    right: '12px',
    width: '4px',
    height: '16px',
    backgroundColor: '#f5b000',
    borderRadius: '2px'
  },
  icon: {
    marginRight: '12px',
    fontSize: '16px'
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    border: '1px solid #222',
    borderRadius: '30px',
    marginTop: 'auto'
  },
  userAvatar: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: '#f5b000'
  },
  userName: {
    fontSize: '13px',
    fontWeight: 'bold',
    color: '#fff'
  },
  signOut: {
    fontSize: '11px',
    color: '#ff4d4d',
    cursor: 'pointer'
  }
};