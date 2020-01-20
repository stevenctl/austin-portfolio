import React from 'react';
import {Box} from '@chakra-ui/core';

const Card = props => {
  return <Box style={{borderRadius: '5px', shadow: '1px black'}} {...props} />;
};

export default Card;
