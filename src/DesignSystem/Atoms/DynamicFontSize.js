import React, { useEffect, useRef } from 'react';

const DynamicFontSize = ({ children }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const fontSize = Math.min(1.3, containerWidth / 1000); // ajustez le calcul ici selon vos besoins
      containerRef.current.style.fontSize = `${fontSize}vw`;
    }
  }, [children]);

  return <div ref={containerRef}>{children}</div>;
};

export default DynamicFontSize;