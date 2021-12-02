import React, { useEffect, useState } from 'react'
import {
    Flex,
    Text,
    Icon,
    Link,
    Menu,
    MenuButton,
    MenuList,
    useDisclosure,
    useColorMode
} from '@chakra-ui/react'
import { IconType } from 'react-icons';
import NavHoverBox from './navhoverbox'

type Props = {
  icon: IconType;
  title: string;
  path: string;
  description?: string;
  active?: boolean;
  navSize: string;
};

export default function NavItem({ icon, title, path, description, active=false, navSize }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const [ bgColor, setBgColor ] = useState('white');
  const [ iconColor, setIconColor ] = useState('gray');
  const [ hoverColor, setHoverColor ] = useState('blue.200');

  const colorChange = () => {
    if (colorMode === 'light') {
        setBgColor('white');
        setIconColor('gray');
        setHoverColor('blue.200');
    } else {
        setBgColor('blue.800');
        setIconColor('white');
        setHoverColor('blue.600');
    }
  }

  useEffect(() => {
    colorChange();
  }, [colorMode])

  return (
      <Flex
          mt={25}
          flexDir="column"
          w="100%"
          alignItems={navSize == "small" ? "center" : "flex-start"}
      >
          <Menu 
            placement="right"
            isOpen={isOpen}
          >
              <Link
                  backgroundColor={active ? 'blue.200' : bgColor}
                  p={3}
                  borderRadius={8}
                  _hover={{ textDecor: 'none', backgroundColor: hoverColor }}
                  w={navSize == "big" ? "100%" : 'auto'}
                  href={path}
              >
                  <MenuButton 
                    w="100%"
                    onMouseEnter={onOpen}
                    onMouseLeave={onClose}
                  >
                      <Flex>
                          <Icon as={icon} fontSize="l" color={active ? "white" : iconColor} />
                          <Text ml={5} fontSize={{ sm: '.5rem', md: '.8rem', lg: '1rem' }} display={navSize == "small" ? "none" : "flex"} style={{ alignItems: 'center' }}>{title}</Text>
                      </Flex>
                  </MenuButton>
              </Link>
              <MenuList
                  py={0}
                  border="none"
                  w={200}
                  h={200}
                  ml={5}
              >
                  
                  <NavHoverBox title={title} icon={icon} description={description} />
              </MenuList>
          </Menu>
      </Flex>
  )
}
