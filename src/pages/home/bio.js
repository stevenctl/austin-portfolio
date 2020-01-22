import {Box, Grid, Heading, Image, Text} from '@chakra-ui/core';
import {assetUrl} from 'fusion-core';
import React from 'react';

const Bio = () => (
  <Grid gridTemplateColumns={['1fr', '1fr 2fr', '1fr 2fr']} gap={24}>
    <Box>
      <Image w={'100%'} src={assetUrl('../../../static/austin.jpeg')} />
    </Box>
    <Box>
      <Heading my={0}>About Me</Heading>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
        <strong>
          <ul>
            <li>Service description #1</li>
            <li>Service description #2</li>
            <li>Service description #3</li>
          </ul>
        </strong>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur.
      </Text>
    </Box>
  </Grid>
);

export default Bio;
