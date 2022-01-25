import {
    Flex,
    Text,
    Icon,
    Link,
    Menu,
    MenuButton,
    MenuList,
    useDisclosure,
    Box
} from '@chakra-ui/react'
import { IconType } from 'react-icons';
import NavHoverBox from './navhoverbox'

type Props = {
  icon: IconType;
  title: string;
  path?: string;
  description?: string;
  active?: boolean;
  navSize: string;
  onClick?: any
};

export default function NavItem({ icon, title, path, description, active=false, navSize, onClick }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return title !== "Reset" ? (
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
                  backgroundColor={active ? 'blue.200' : 'blue.800'}
                  p={3}
                  borderRadius={8}
                  _hover={{ textDecor: 'none', backgroundColor: 'blue.600' }}
                  w={navSize == "big" ? "100%" : 'auto'}
                  href={path}
              >
                  <MenuButton 
                    w="100%"
                    onMouseEnter={onOpen}
                    onMouseLeave={onClose}
                    onClick={onClick}
                  >
                      <Flex alignItems='center'>
                          <Icon as={icon} fontSize="l" color={active ? "white" : 'blue.100'} />
                          <Text ml={5} fontSize={{ sm: '.8rem', md: '1rem', lg: '1rem' }} display={navSize == "small" ? "none" : "flex"} style={{ alignItems: 'center' }}>{title}</Text>
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
  ) : (
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
        <Box
            backgroundColor={active ? 'blue.200' : 'blue.800'}
            p={3}
            borderRadius={8}
            _hover={{ textDecor: 'none', backgroundColor: 'blue.600' }}
            w={navSize == "big" ? "100%" : 'auto'}
        >
            <MenuButton 
              w="100%"
              onMouseEnter={onOpen}
              onMouseLeave={onClose}
              onClick={onClick}
            >
                <Flex alignItems='center'>
                    <Icon as={icon} fontSize="l" color='white' />
                    <Text ml={5} fontSize={{ sm: '.8rem', md: '1rem', lg: '1rem' }} display={navSize == "small" ? "none" : "flex"} style={{ alignItems: 'center' }}>{title}</Text>
                </Flex>
            </MenuButton>
        </Box>
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
