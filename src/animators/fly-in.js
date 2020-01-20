import React, {useRef, useEffect, useState} from 'react';

const FlyIn = ({children, from = 'left', delay = 1000, speed = '0.5s'}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) return;
    setTimeout(() => {
      console.log('show');
      setShow(true);
    }, delay);
  }, [delay, show]);

  let ix = 0;
  let iy = 0;
  switch (from) {
    case 'left':
      ix = '-100%';
      break;
    case 'right':
      ix = '100%';
      break;
    case 'top':
      iy = '-100%';
      break;
    case 'bottom':
      iy = '100%';
  }

  return (
    <div style={{overflow: 'hidden'}}>
      <div
        style={{
          transition: `transform ${speed} ease`,
          transform: show ? 'translate(0, 0)' : `translate(${ix}, ${iy})`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default FlyIn;
