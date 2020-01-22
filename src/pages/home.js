import React from 'react';
import {AspectRatioBox, Box, Heading, Flex} from '@chakra-ui/core';
import {assetUrl} from 'fusion-core';
import Overlay from '../blocks/overlay';
import Slide from '../animators/slide';

const heroUrlWebm = assetUrl('../../static/hero.webm');
const overlayText = ['Sports', 'Weddings & Events', 'Commercial Marketing'];

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
            direction="column"
            alignItems="flex-start"
            justifyContent="flex-end"
          >
            {overlayText.map((item, i) => (
              <Slide
                mb={i === overlayText.length - 1 ? 4 : 0} // hack: giving last element margin b/c flex-padding won't work
                key={`fly-in-text-${i}`}
                enterDelay={(i + 1) * 1000}
                exitDelay={(overlayText.length - i + 1) * 1000 + 10000} // first term makes all exit at once, second term makes them all stay together longer
              >
                <Heading my="4" fontSize={'4xl'} color="white">
                  {item}
                </Heading>
              </Slide>
            ))}
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
  </Box>
);

export default Home;
