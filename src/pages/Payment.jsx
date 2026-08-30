import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/Sidebar';

export default function Payment() {
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiry: '',
    cvv: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const cartItems = [
    { id: 1, name: "Men's Premium Dress Shirt", price: 6700 },
    { id: 2, name: 'Rolex Datejust Automatic Watch', price: 25000 },
    { id: 3, name: 'Designer Leather Top-Handle Bag', price: 6200 },
  ];

  const subtotal = 37900;
  const shipping = 1650;
  const total = subtotal + shipping;

  // --- Validation Functions ---

  // Card Number validation (Digits only, exactly 16 characters)
  const isCardNumberValid = (number) => {
    const cleanNumber = number.replace(/\s+/g, '');
    return /^\d{16}$/.test(cleanNumber);
  };

  // Cardholder Name validation (Not empty)
  const isCardHolderValid = (name) => {
    return name.trim().length > 0;
  };

  // CVV validation (Exactly 3 digits)
  const isCvvValid = (cvv) => {
    return /^\d{3}$/.test(cvv);
  };

  // Expiry Date validation (Future date check for MM/YY format)
  const isExpiryValid = (expiry) => {
    const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!regex.test(expiry)) return false;

    const [month, year] = expiry.split('/').map(Number);
    const now = new Date();
    const currentYear = Number(now.getFullYear().toString().slice(-2));
    const currentMonth = now.getMonth() + 1;

    if (year < currentYear) return false;
    if (year === currentYear && month < currentMonth) return false;

    return true;
  };

  // Form Complete Status Check
  const isFormValid =
    paymentMethod === 'card'
      ? isCardNumberValid(cardData.cardNumber) &&
        isCardHolderValid(cardData.cardHolder) &&
        isExpiryValid(cardData.expiry) &&
        isCvvValid(cardData.cvv)
      : true; // Cash / Paypal pass without card inputs

  const handlePayment = async () => {
    if (!isFormValid) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await axios.post('http://localhost:5000/api/payments', {
        orderId: 'ord_2026_001',
        userId: 'usr_101',
        amount: total,
        method: paymentMethod,
        status: 'pending',
        currency: 'LKR',
      });

      navigate('/order-summary', {
        state: {
          payment: response.data.payment,
          total,
          subtotal,
          shipping,
          cartItems,
        },
      });
    } catch (error) {
      setSubmitError(error.response?.data?.message || 'Payment failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* 1. Sidebar */}
      <Sidebar />

      {/* 2. Main Content */}
      <main style={styles.main}>
        <h1 style={styles.heading}>Payment</h1>
        <p style={styles.subHeading}>Monitor revenue, successful transactions, and payment statuses</p>
        <hr style={styles.divider} />

        {/* Stepper Progress Bar */}
        <div style={styles.stepperContainer}>
          <div style={styles.stepGroup}>
            <div style={styles.stepCompleted}>1</div>
            <span style={styles.stepTextActive}>Cart</span>
          </div>
          <div style={styles.lineCompleted} />
          <div style={styles.stepGroup}>
            <div style={styles.stepCompleted}>2</div>
            <span style={styles.stepTextActive}>Delivery</span>
          </div>
          <div style={styles.lineCompleted} />
          <div style={styles.stepGroup}>
            <div style={styles.stepActive}>3</div>
            <span style={styles.stepTextActive}>Payment</span>
          </div>
          <div style={styles.lineInactive} />
          <div style={styles.stepGroup}>
            <div style={styles.stepInactive}>4</div>
            <span style={styles.stepText}>Confirm</span>
          </div>
        </div>

        {/* Layout Grid */}
        <div style={styles.grid}>
          {/* Left Card: Payment Method */}
          <div style={styles.card}>
            <h3 style={styles.cardHeader}>Payment Method</h3>

            {/* Methods Selection Tabs */}
            <div style={styles.tabsGrid}>
              <button
                type="button"
                style={{
                  ...styles.tabBtn,
                  backgroundColor: paymentMethod === 'card' ? '#fffbe6' : '#f8f8f8',
                  border: paymentMethod === 'card' ? '1.5px solid #f5b000' : '1px solid #eee',
                }}
                onClick={() => setPaymentMethod('card')}
              >
                💳
                <span style={styles.tabText}>Credit / Debit Card</span>
              </button>

              <button
                type="button"
                style={{
                  ...styles.tabBtn,
                  backgroundColor: paymentMethod === 'paypal' ? '#fffbe6' : '#f8f8f8',
                  border: paymentMethod === 'paypal' ? '1.5px solid #f5b000' : '1px solid #eee',
                }}
                onClick={() => setPaymentMethod('paypal')}
              >
                🅿️
                <span style={styles.tabText}>PayPal</span>
              </button>

              <button
                type="button"
                style={{
                  ...styles.tabBtn,
                  backgroundColor: paymentMethod === 'cod' ? '#fffbe6' : '#f8f8f8',
                  border: paymentMethod === 'cod' ? '1.5px solid #f5b000' : '1px solid #eee',
                }}
                onClick={() => setPaymentMethod('cod')}
              >
                💵
                <span style={styles.tabText}>Cash on Delivery</span>
              </button>
            </div>

            {/* Card Inputs */}
            {paymentMethod === 'card' && (
              <>
                <div style={styles.formGroup}>
                  <label style={styles.label}>CARD NUMBER</label>
                  <input
                    style={{
                      ...styles.input,
                      borderColor:
                        cardData.cardNumber && !isCardNumberValid(cardData.cardNumber)
                          ? '#ff4d4d'
                          : '#ccc',
                    }}
                    placeholder="4242 4242 4242 4242"
                    maxLength={19}
                    value={cardData.cardNumber}
                    onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
                  />
                  {cardData.cardNumber && !isCardNumberValid(cardData.cardNumber) && (
                    <span style={styles.errorText}>Enter valid 16-digit card number</span>
                  )}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>CARDHOLDER NAME</label>
                  <input
                    style={styles.input}
                    placeholder="Amara Silva"
                    value={cardData.cardHolder}
                    onChange={(e) => setCardData({ ...cardData, cardHolder: e.target.value })}
                  />
                </div>

                <div style={styles.twoCol}>
                  <div>
                    <label style={styles.label}>EXPIRY DATE</label>
                    <input
                      style={{
                        ...styles.input,
                        borderColor:
                          cardData.expiry && !isExpiryValid(cardData.expiry) ? '#ff4d4d' : '#ccc',
                      }}
                      placeholder="MM / YY"
                      maxLength={5}
                      value={cardData.expiry}
                      onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                    />
                    {cardData.expiry && !isExpiryValid(cardData.expiry) && (
                      <span style={styles.errorText}>Invalid / past date</span>
                    )}
                  </div>
                  <div>
                    <label style={styles.label}>CVV</label>
                    <input
                      style={{
                        ...styles.input,
                        borderColor: cardData.cvv && !isCvvValid(cardData.cvv) ? '#ff4d4d' : '#ccc',
                      }}
                      placeholder="***"
                      type="password"
                      maxLength={3}
                      value={cardData.cvv}
                      onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                    />
                    {cardData.cvv && !isCvvValid(cardData.cvv) && (
                      <span style={styles.errorText}>Must be 3 digits</span>
                    )}
                  </div>
                </div>

                <div style={styles.stripeNote}>
                  🔒 Your payment info is encrypted and secure via stripe.
                </div>
              </>
            )}

            {submitError && <div style={styles.errorBanner}>{submitError}</div>}

            <button
              disabled={!isFormValid || isSubmitting}
              onClick={handlePayment}
              style={{
                ...styles.submitBtn,
                backgroundColor: isFormValid && !isSubmitting ? '#f5b000' : '#e0e0e0',
                color: isFormValid && !isSubmitting ? '#000' : '#888',
                cursor: isFormValid && !isSubmitting ? 'pointer' : 'not-allowed',
              }}
            >
              {isSubmitting ? 'PROCESSING PAYMENT...' : `CONFIRM PAYMENT - LKR ${total}`}
            </button>
          </div>

          {/* Right Card: Order Summary */}
          <div style={styles.card}>
            <h3 style={styles.cardHeader}>Order Summary</h3>

            <div style={styles.itemList}>
              {cartItems.map((item) => (
                <div key={item.id} style={styles.itemRow}>
                  <span style={styles.itemName}>{item.name}</span>
                  <span style={styles.itemPrice}>LKR {item.price}</span>
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

  tabsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '20px' },
  tabBtn: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', padding: '12px 8px', borderRadius: '8px', cursor: 'pointer', outline: 'none' },
  tabText: { fontSize: '10px', color: '#333', fontWeight: 'bold' },

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

  errorText: { color: '#ff4d4d', fontSize: '9px', marginTop: '4px', display: 'block' },
  errorBanner: { marginBottom: '12px', padding: '10px 12px', backgroundColor: '#fff1f0', border: '1px solid #f5c2c7', borderRadius: '6px', color: '#b42318', fontSize: '11px', fontWeight: '600' },
  stripeNote: { padding: '10px', border: '1px dashed #ccc', borderRadius: '6px', fontSize: '10px', color: '#666', textAlign: 'center', marginBottom: '20px' },
  submitBtn: { width: '100%', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', fontSize: '12px', transition: '0.3s' },

  itemList: { display: 'flex', flexDirection: 'column', gap: '12px' },
  itemRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  itemName: { fontSize: '11px', color: '#333' },
  itemPrice: { fontWeight: 'bold', fontSize: '11px', color: '#111' },

  summaryDivider: { border: 'none', borderTop: '1px solid #eee', margin: '20px 0' },
  summaryRow: { display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#444', marginBottom: '10px' },
  totalRow: { display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: 'bold', color: '#000', marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #eee' },
};