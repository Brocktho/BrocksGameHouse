import React, { useState, useEffect } from 'react';

const useFocus = () => {
    const [active, setActive] = useState(document.activeElement);
  
    const handleFocusIn = () => {
        setActive(document.activeElement);
    }
    
    useEffect(() => {
        document.addEventListener('focusin', handleFocusIn)
        return () => {
        document.removeEventListener('focusin', handleFocusIn)
    };
    }, [])
  
  return active;
}

export default useFocus;