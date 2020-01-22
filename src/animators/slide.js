import React, {useEffect, useRef, useState} from 'react';
import {Box} from '@chakra-ui/core';

const DISTANCE = 120;

const Slide = ({
  enterDelay = 1000,
  exitDelay = 1000,
  speed = '0.5s',
  cycle = false,

  startShowing = false,

  top = false,
  bottom = false,
  left = false,
  right = false,

  ...props
}) => {
  const [show, setShow] = useState(false);
  const scheduleFunc = cycle ? setInterval : setTimeout;
  const showRef = useRef(show);
  useEffect(() => {
    scheduleFunc(
      () => setShow(!showRef.current),
      showRef.current ? exitDelay : enterDelay
    );
  }, [cycle, enterDelay, exitDelay, scheduleFunc, show]);

  let ix = 0;
  let iy = 0;
  if (top) {
    iy -= DISTANCE;
  }
  if (bottom) {
    iy += DISTANCE;
  }
  if (left) {
    ix -= DISTANCE;
  }
  if (right) {
    ix += DISTANCE;
  }

  const {children, ...rest} = props;
  return (
    <Box {...rest} style={{overflow: 'hidden'}}>
      <div
        style={{
          transition: `transform ${speed} ease`,
          transform: show ? 'translate(0, 0)' : `translate(${ix}%, ${iy}%)`,
        }}
      >
        {children}
      </div>
    </Box>
  );
};

export default Slide;
