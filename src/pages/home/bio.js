import {Box, Grid, Heading, Image, Text} from '@chakra-ui/core';
import {assetUrl} from 'fusion-core';
import {theme} from '../../config';
import React from 'react';
import Slide from '../../animators/slide';

const Bio = () => (
  <Grid
    px={[4, 4, 0]}
    gridTemplateColumns={['1fr', '1fr 2fr', '1fr 2fr']}
    gap={24}
  >
    <Slide left enterDelay={0}>
      <Box>
        <Image w={'100%'} src={assetUrl('../../../static/austin.jpeg')} />
      </Box>
    </Slide>
    <Slide right enterDelay={0}>
      <Heading my={0}>About Me</Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
        <Slide bottom enterDelay={600} color={theme.accent}>
          <strong>
            <ul>
              <li>Service description #1</li>
              <li>Service description #2</li>
              <li>Service description #3</li>
            </ul>
          </strong>
        </Slide>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur.
      </Text>
    </Slide>
  </Grid>
);

export default Bio;
