import { IoHomeOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import Cookies from 'js-cookie'
import { useLocation, useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate()
  const location = useLocation();

  const handleLogout = () => {
    
    const to = location.pathname === '/user/profile' ? '/' : '/user/profile';
    navigate(to);
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
      {location.pathname === '/user/profile' ?  <IoHomeOutline style={iconStyle} /> : <FaRegUser />}
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