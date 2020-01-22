import React, {useEffect, useState} from 'react';
import {Box} from '@chakra-ui/core';

const Slide = ({
  from = 'left',
  enterDelay = 1000,
  exitDelay = 1000,
  speed = '0.5s',
  cycle = false,
  ...props
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const scheduleFunc = cycle ? setInterval : setTimeout;
    scheduleFunc(() => setShow(!show), show ? exitDelay : enterDelay);
  }, [cycle, enterDelay, exitDelay, show]);

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

  const {children, ...rest} = props;
  return (
    <Box {...rest} style={{overflow: 'hidden'}}>
      <div
        style={{
          transition: `transform ${speed} ease`,
          transform: show ? 'translate(0, 0)' : `translate(${ix}, ${iy})`,
        }}
      >
        {children}
      </div>
    </Box>
  );
};

export default Slide;
