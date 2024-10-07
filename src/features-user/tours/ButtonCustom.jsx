import React, { useState } from 'react';
const Button36 = ({label,disabled}) => {
  const [isHovered, setIsHovered] = useState(false);
  const buttonStyle = {
    backgroundImage: 'linear-gradient(92.88deg, #455EB5 9.16%, #5643CC 43.89%, #673FD7 64.72%)',
    borderRadius: '8px',
    borderStyle: 'none',
    boxSizing: 'border-box',
    color: '#FFFFFF',
    cursor: disabled ?'not-allowed' : 'pointer',
    flexShrink: 0,
    fontFamily: '"Inter UI", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
    fontSize: '16px',
    fontWeight: 500,
    height: '4rem',
    padding: '0 1.6rem',
    textAlign: 'center',
    textShadow: 'rgba(0, 0, 0, 0.25) 0 3px 8px',
    transition: 'all .5s',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    touchAction: 'manipulation',
    boxShadow: isHovered ? 'rgba(80, 63, 205, 0.7) 0 1px 30px' : 'none',
    transitionDuration: isHovered ? '.1s' : '.5s',
        margin:'0.5rem'
  };
  return (
    <button
      style={buttonStyle}
      // disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {label}
    </button>
  );
};
export default Button36;
export const Button75 = ({label,onClick,disabled}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const buttonStyle = {
    alignItems: 'center',
    backgroundImage: 'linear-gradient(135deg, #f34079 40%, #fc894d)',
    border: 0,
    borderRadius: '10px',
    boxSizing: 'border-box',
    color: '#fff',
    cursor:  disabled ?'not-allowed' : 'pointer',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: '"Codec cold", sans-serif',
    fontSize: '12px',
    fontWeight: 700,
    height: '4rem',
    justifyContent: 'center',
    letterSpacing: '.4px',
    lineHeight: 1,
    maxWidth: '100%',
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingTop: '3px',
    textDecoration: 'none',
    textTransform: 'uppercase',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    touchAction: 'manipulation',
    outline: isActive ? 'none' : '',
    transition: 'all 200ms',
    margin:'0.5rem'
  };
  const textStyle = {
    transform: isHovered ? 'scale(0.9)' : 'scale(1)',
    opacity: isHovered ? 0.75 : 1,
    transition: 'all 200ms',
  };
  return (
    <button
      style={buttonStyle}
      onClick={onClick} 
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
    >
      <span style={textStyle}>{label}</span>
    </button>
  );
};