import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { apiFetch, updateStoredUser } from '../lib/api';
import { splitName } from '../lib/normalizers';

export default function Profile() {
  const [profileHeader, setProfileHeader] = useState({ firstName: '', lastName: '', email: '' });
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const [isEditingBilling, setIsEditingBilling] = useState(false);
  const [billingInfo, setBillingInfo] = useState({ country: '', city: '', postalCode: '', taxId: '' });

  useEffect(() => {
    apiFetch('/users/profile', { auth: true })
      .then((data) => {
        const user = data.user || {};
        const name = splitName(user.name);
        const extras = JSON.parse(localStorage.getItem('hos_profile_extras') || '{}');
        const header = { firstName: name.firstName, lastName: name.lastName, email: user.email || '' };
        setProfileHeader(header);
        setPersonalInfo({ ...header, phone: extras.phone || '' });
        setBillingInfo(extras.billing || { country: '', city: '', postalCode: '', taxId: '' });
      })
      .catch(() => {});
  }, []);

  const handlePersonalChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  const handleBillingChange = (e) => {
    setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
  };

  const handleSavePersonal = async () => {
    try {
      const data = await apiFetch('/users/profile', {
        method: 'PUT',
        auth: true,
        body: {
          name: `${personalInfo.firstName} ${personalInfo.lastName}`.trim(),
          email: personalInfo.email,
        },
      });
      updateStoredUser(data.user || {});
      const name = splitName(data.user?.name || `${personalInfo.firstName} ${personalInfo.lastName}`);
      setProfileHeader({ firstName: name.firstName, lastName: name.lastName, email: data.user?.email || personalInfo.email });
      const previous = JSON.parse(localStorage.getItem('hos_profile_extras') || '{}');
      localStorage.setItem('hos_profile_extras', JSON.stringify({ ...previous, phone: personalInfo.phone }));
      setIsEditingPersonal(false);
      alert('Personal Information saved successfully!');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCancelPersonal = () => {
    setPersonalInfo((prev) => ({ ...prev, firstName: profileHeader.firstName, lastName: profileHeader.lastName, email: profileHeader.email }));
    setIsEditingPersonal(false);
  };

  const handleSaveBilling = () => {
    const previous = JSON.parse(localStorage.getItem('hos_profile_extras') || '{}');
    localStorage.setItem('hos_profile_extras', JSON.stringify({ ...previous, billing: billingInfo }));
    setIsEditingBilling(false);
    alert('Billing Address saved successfully!');
  };

  return (
    <div style={{ display: 'flex', backgroundColor: '#f3f3f3', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '40px 60px' }}>
        
        {/* Top User Profile Card */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
            <div style={avatarStyle}>👤</div>
            <div>
              <h2 style={{ margin: '0 0 5px 0', fontSize: '24px', fontWeight: 'bold', color: '#000' }}>
                {profileHeader.firstName} {profileHeader.lastName}
              </h2>
              <p style={{ margin: 0, color: '#444', textDecoration: 'underline' }}>{profileHeader.email}</p>
            </div>
          </div>
          <div style={{ fontSize: '40px' }}>🏅</div>
        </div>

        {/* Personal Information Card */}
        <div style={formCardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', color: '#111' }}>Personal Information</h3>
            {isEditingPersonal ? (
              <span 
                onClick={handleCancelPersonal} 
                style={{ color: '#d32f2f', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Cancel ✖
              </span>
            ) : (
              <span 
                onClick={() => setIsEditingPersonal(true)} 
                style={{ color: '#000', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Edit ✏️
              </span>
            )}
          </div>
          
          <div style={gridTwoCol}>
            <div>
              <label style={labelStyle}>First Name</label>
              <input 
                name="firstName"
                style={{
                  ...inputStyle,
                  backgroundColor: isEditingPersonal ? '#fff' : '#dcdcdc',
                  border: isEditingPersonal ? '1.5px solid #f5b000' : '1px solid #ccc',
                }} 
                value={personalInfo.firstName} 
                onChange={handlePersonalChange}
                readOnly={!isEditingPersonal} 
              />
            </div>
            <div>
              <label style={labelStyle}>Last Name</label>
              <input 
                name="lastName"
                style={{
                  ...inputStyle,
                  backgroundColor: isEditingPersonal ? '#fff' : '#dcdcdc',
                  border: isEditingPersonal ? '1.5px solid #f5b000' : '1px solid #ccc',
                }} 
                value={personalInfo.lastName} 
                onChange={handlePersonalChange}
                readOnly={!isEditingPersonal} 
              />
            </div>
            <div>
              <label style={labelStyle}>Email Address</label>
              <input 
                name="email"
                style={{
                  ...inputStyle,
                  backgroundColor: isEditingPersonal ? '#fff' : '#dcdcdc',
                  border: isEditingPersonal ? '1.5px solid #f5b000' : '1px solid #ccc',
                }} 
                value={personalInfo.email} 
                onChange={handlePersonalChange}
                readOnly={!isEditingPersonal} 
              />
            </div>
            <div>
              <label style={labelStyle}>Phone Number</label>
              <input 
                name="phone"
                style={{
                  ...inputStyle,
                  backgroundColor: isEditingPersonal ? '#fff' : '#dcdcdc',
                  border: isEditingPersonal ? '1.5px solid #f5b000' : '1px solid #ccc',
                }} 
                value={personalInfo.phone} 
                onChange={handlePersonalChange}
                readOnly={!isEditingPersonal} 
              />
            </div>
          </div>

          {isEditingPersonal && (
            <div style={{ textAlign: 'center', marginTop: '25px' }}>
              <button onClick={handleSavePersonal} style={btnStyle}>Save Changes</button>
            </div>
          )}
        </div>

        {/* Billing Address Card */}
        <div style={formCardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', color: '#111' }}>Billing Address</h3>
            {isEditingBilling ? (
              <span 
                onClick={() => setIsEditingBilling(false)} 
                style={{ color: '#d32f2f', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Cancel ✖
              </span>
            ) : (
              <span 
                onClick={() => setIsEditingBilling(true)} 
                style={{ color: '#000', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Edit ✏️
              </span>
            )}
          </div>

          <div style={gridTwoCol}>
            <div>
              <label style={labelStyle}>Country</label>
              <input 
                name="country"
                style={{
                  ...inputStyle,
                  backgroundColor: isEditingBilling ? '#fff' : '#dcdcdc',
                  border: isEditingBilling ? '1.5px solid #f5b000' : '1px solid #ccc',
                }} 
                value={billingInfo.country} 
                onChange={handleBillingChange}
                readOnly={!isEditingBilling} 
              />
            </div>
            <div>
              <label style={labelStyle}>City / State</label>
              <input 
                name="city"
                style={{
                  ...inputStyle,
                  backgroundColor: isEditingBilling ? '#fff' : '#dcdcdc',
                  border: isEditingBilling ? '1.5px solid #f5b000' : '1px solid #ccc',
                }} 
                value={billingInfo.city} 
                onChange={handleBillingChange}
                readOnly={!isEditingBilling} 
              />
            </div>
            <div>
              <label style={labelStyle}>Postal code</label>
              <input 
                name="postalCode"
                style={{
                  ...inputStyle,
                  backgroundColor: isEditingBilling ? '#fff' : '#dcdcdc',
                  border: isEditingBilling ? '1.5px solid #f5b000' : '1px solid #ccc',
                }} 
                value={billingInfo.postalCode} 
                onChange={handleBillingChange}
                readOnly={!isEditingBilling} 
              />
            </div>
            <div>
              <label style={labelStyle}>Tax ID</label>
              <input 
                name="taxId"
                style={{
                  ...inputStyle,
                  backgroundColor: isEditingBilling ? '#fff' : '#dcdcdc',
                  border: isEditingBilling ? '1.5px solid #f5b000' : '1px solid #ccc',
                }} 
                value={billingInfo.taxId} 
                onChange={handleBillingChange}
                readOnly={!isEditingBilling} 
              />
            </div>
          </div>

          {isEditingBilling && (
            <div style={{ textAlign: 'center', marginTop: '25px' }}>
              <button onClick={handleSaveBilling} style={btnStyle}>Save Changes</button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

const cardStyle = {
  backgroundColor: '#dcdcdc',
  borderRadius: '20px',
  padding: '30px 40px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '30px'
};

const avatarStyle = {
  width: '100px',
  height: '100px',
  borderRadius: '50%',
  backgroundColor: '#fff',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '50px',
  border: '2px solid #ccc'
};

const formCardStyle = {
  backgroundColor: '#e8e8e8',
  borderRadius: '20px',
  padding: '30px 40px',
  marginBottom: '30px',
  boxShadow: '0 4px 10px rgba(0,0,0,0.03)'
};

const gridTwoCol = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '20px'
};

const labelStyle = {
  display: 'block',
  fontSize: '12px',
  fontWeight: '600',
  marginBottom: '8px',
  color: '#333'
};

const inputStyle = {
  width: '100%',
  padding: '12px 15px',
  borderRadius: '10px',
  fontSize: '14px',
  boxSizing: 'border-box',
  outline: 'none',
  transition: '0.3s',
  color: '#000000', // Type කරන අකුරු පැහැදිලිව කළු පාටින් පෙනීමට
  fontWeight: '500'
};

const btnStyle = {
  backgroundColor: '#f5b000',
  border: 'none',
  padding: '12px 40px',
  borderRadius: '10px',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: '14px',
  color: '#000'
};