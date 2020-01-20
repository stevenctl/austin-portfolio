import React from 'react';
import {Box, Flex, Image, Link, Text} from '@chakra-ui/core';
import {theme} from '../config';
import useWindowScroll from '@react-hook/window-scroll';

const dockedStyle = {
  display: 'block',
  position: 'fixed',
  zIndex: 10,
  width: '100%',
};

const NavItem = ({text, href, white}) => (
  <Flex align="center" justify="center" width="32">
    <Link href={href}>
      <Text color={white ? 'white' : theme.accent} fontSize="2xl">
        {text}
      </Text>
    </Link>
  </Flex>
);

const Header = ({whiteLogoUrl, blackLogoUrl, links}) => {
  const scrollY = useWindowScroll(10);
  const atTop = scrollY === 0;

  const logoUrl = atTop ? whiteLogoUrl : blackLogoUrl;
  const bg = atTop ? '#0000' : '#FFF';

  return (
    <div>
      <div style={{...dockedStyle, backgroundColor: bg}}>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          h="96px"
          px={[0, 40]}
        >
          <Image h="100%" alt="logo" src={logoUrl} />
          <Flex>
            {links.map((item, i) => (
              <NavItem key={`navlink-${i}`} {...item} white={atTop} />
            ))}
          </Flex>
        </Flex>
      </div>
    </div>
  );
};

export default Header;
