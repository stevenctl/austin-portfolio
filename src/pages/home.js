import React from 'react';
import {AspectRatioBox, Box} from '@chakra-ui/core';
import {assetUrl} from 'fusion-core';

const heroUrlWebm = assetUrl('../../static/hero.webm');

const Home = () => (
  <Box>
    <AspectRatioBox m={0} ratio={21 / 9}>
      <Box>
        <video style={{width: '100%', height: '100%'}} autoPlay loop>
          <source src={heroUrlWebm} type="video/webm" />
        </video>
      </Box>
    </AspectRatioBox>
    <Box h={'80px'} />
    <Box h={'80px'} />
    <Box h={'80px'} />
    <Box h={'80px'} />
    <Box h={'80px'} />
    <Box h={'80px'} />
  </Box>
);

export default Home;
