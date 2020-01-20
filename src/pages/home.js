import React from 'react';
import {
  AspectRatioBox,
  Box,
  Heading,
  Text,
  Flex,
  Image,
  Button,
} from '@chakra-ui/core';
import {assetUrl} from 'fusion-core';
import Overlay from '../blocks/overlay';
import Card from '../blocks/card';
import FlyIn from '../animators/fly-in';
import {theme} from '../config';

const heroUrlWebm = assetUrl('../../static/hero.webm');

const overlayItems = [
  {
    content: (
      <FlyIn delay={1000}>
        <Heading fontSize="6xl" color="white">
          Sports
        </Heading>
      </FlyIn>
    ),
    position: {
      left: '10%',
      top: '40%',
    },
  },
  {
    content: (
      <FlyIn delay={2000}>
        <Heading fontSize="6xl" color="white">
          Weddings & Events
        </Heading>
      </FlyIn>
    ),
    position: {
      left: '10%',
      top: '50%',
    },
  },
  {
    content: (
      <FlyIn delay={3000}>
        <Heading fontSize="6xl" color="white">
          Commercial Marketing
        </Heading>
      </FlyIn>
    ),
    position: {
      left: '10%',
      top: '60%',
    },
  },
  {
    content: (
      <FlyIn from="bottom" delay={1}>
        <Box w="400">
          <Button w="200px">Contact</Button>
          <Box w="100%" h="4" />
          <Button w="200px">Portfolio</Button>
        </Box>
      </FlyIn>
    ),
    position: {
      right: '10em',
      top: '50%',
    },
  },
];

const Home = () => (
  <Box>
    <Overlay items={overlayItems}>
      <AspectRatioBox m={0} ratio={21 / 9}>
        <Box>
          <video style={{width: '100%', height: '100%'}} autoPlay loop>
            <source src={heroUrlWebm} type="video/webm" />
          </video>
        </Box>
      </AspectRatioBox>
    </Overlay>
    <Box pt={10} pb={400} px={[0, 500]}>
      <Flex justifyContent="space-between">
        <Image src="https://placehold.it/400x400" />
        <Card align="flex-end" w={400}>
          <Text color={theme.accent} fontSize="4xl">
            Lorem ipsum dolor sit amet
          </Text>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Text>
        </Card>
      </Flex>
    </Box>
  </Box>
);

export default Home;
