import React from 'react';
import { useNavigate } from 'react-router-dom';

function Button({ label = 'Button', type = 'button', fsize='font-semibold', className = '', onclick, to, icon }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (onclick) {
      onclick(e);
    }
    if (to) {
      if (to.startsWith('#')) {
        window.location.hash = to;
      } else {
        navigate(to);
      }
    }
  };

  return (
    <button
      type={type}
      className={`flex justify-center justify-items-center rounded-md ${fsize}  shadow-sm focus:outline-none transition duration-300 ${className}`}
      onClick={handleClick}
    >
      {label}{icon}
    </button>
  );
}

export default Button;