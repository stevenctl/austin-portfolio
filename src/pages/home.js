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

const Home = () => (
  <Box>
    <Overlay>
      <Box
        style={{overflow: 'hidden'}}
        w="100vw"
        display={['none', 'none', 'block']}
      >
        <Flex w="100%" h="calc((9 / 21) * 100vw)" px={[0, 40]}>
          <Flex
            h="100%"
            alignItems="flex-start"
            justifyContent={['center']}
            direction="column"
          >
            {['Sports', 'Weddings & Events', 'Commercial Marketing'].map(
              (item, i) => (
                <FlyIn key={`fly-in-text-${i}`} delay={(i + 1) * 1000}>
                  <Heading m={0} fontSize={['xl', '6xl']} color="white">
                    {item}
                  </Heading>
                </FlyIn>
              )
            )}
          </Flex>
        </Flex>
      </Box>
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
