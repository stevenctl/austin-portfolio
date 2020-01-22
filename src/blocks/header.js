import React, {useState} from 'react';
import {
  Flex,
  Box,
  IconButton,
  Image,
  Link,
  Text,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  useDisclosure,
  DrawerCloseButton,
} from '@chakra-ui/core';
import {theme} from '../config';
import useWindowScroll from '@react-hook/window-scroll';

const dockedStyle = {
  transition: 'background-color 1s ease',
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

const Nav = ({links, atTop, ...rest}) => (
  <Flex {...rest}>
    {links.map((item, i) => (
      <NavItem key={`navlink-${i}`} {...item} white={atTop} />
    ))}
  </Flex>
);

const MobileNav = ({links, atTop, ...rest}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const btnRef = React.useRef();

  return (
    <Box pr={4} {...rest}>
      <IconButton ref={btnRef} onClick={onOpen} icon={'chevron-down'} />
      <Drawer isOpen={isOpen} onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody display="flex" justify="center">
            <Nav w="100%" direction="column" links={links} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

const Header = ({whiteLogoUrl, blackLogoUrl, links}) => {
  const scrollY = useWindowScroll(10);
  const atTop = scrollY === 0;

  const bg = atTop ? '#0000' : '#FFF';

  return (
    <div>
      <div style={{...dockedStyle, backgroundColor: bg}}>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          h="96px"
          pr={[0, 0, 40]}
          pl={[4, 4, 40]}
        >
          <Image
            display={atTop ? 'block' : 'none'}
            h="100%"
            alt="logo"
            src={whiteLogoUrl}
          />
          <Image
            display={!atTop ? 'block' : 'none'}
            h="100%"
            alt="logo"
            src={blackLogoUrl}
          />
          <Nav links={links} atTop={atTop} display={['none', 'flex', 'flex']} />
          <MobileNav
            display={['flex', 'none', 'none']}
            links={links}
            atTop={atTop}
          />
        </Flex>
      </div>
    </div>
  );
};

export default Header;
