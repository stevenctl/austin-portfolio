import {Box} from '@chakra-ui/core';
import React from 'react';
import Hero from './hero';
import Bio from './bio';

const Home = () => (
  <div>
    <Hero />
    <Box pt={4} mx="auto" maxW={['30em', '44em', '62em']}>
      <Bio />
    </Box>
  </div>
);

export default Home;
