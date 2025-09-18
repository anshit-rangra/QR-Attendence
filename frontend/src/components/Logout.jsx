import { FiLogOut } from 'react-icons/fi';
import Cookies from 'js-cookie'

const LogoutButton = () => {
  const handleLogout = () => {
    console.log('Logging out...');
    Cookies.remove("admin")
    Cookies.remove("attendanceToken")
    Cookies.remove("role")
    window.location.reload()
    // Add your logout logic here
  };

  

  return (
    <div style={containerStyle}>
      <button 
        onClick={handleLogout}
        style={buttonStyle}
        aria-label="Logout"
        onMouseOver={(e) => {
          e.target.style.backgroundColor = '#c0392b';
          e.target.style.transform = 'scale(1.05)';
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = '#e74c3c';
          e.target.style.transform = 'scale(1)';
        }}
        onMouseDown={(e) => {
          e.target.style.transform = 'scale(0.95)';
        }}
        onMouseUp={(e) => {
          e.target.style.transform = 'scale(1.05)';
        }}
      >
        <FiLogOut style={iconStyle} />
      </button>
    </div>
  );
};

// Styles
const containerStyle = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  zIndex: 1000,
};

const buttonStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '60px',
  height: '60px',
  backgroundColor: '#e74c3c',
  color: 'white',
  border: 'none',
  borderRadius: '50%',
  cursor: 'pointer',
  boxShadow: '0 4px 12px rgba(231, 76, 60, 0.3)',
  transition: 'all 0.3s ease',
  fontSize: '16px',
};

const iconStyle = {
  fontSize: '24px',
};

export default LogoutButton;