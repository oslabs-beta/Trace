// Based off Chakra UI Responsive Sidebar Tutorial: https://github.com/bjcarlson42/chakra-left-responsive-navbar/tree/main/components

// React, Next, and Styled Components Imports
import { useState, ReactNode } from 'react'
import NavItem from './navitem'

// Chakra Imports
import {
  Flex,
  Text,
  IconButton,
  Divider,
  Avatar,
  Heading,
  useColorMode
} from '@chakra-ui/react'

// Feather Icon Imports
import {
  FiMenu,
  FiGrid,
  FiBarChart,
  FiAlertTriangle,
  FiShare2,
  FiStar,
  FiSettings
} from 'react-icons/fi'

// Framer Motion
import { motion } from 'framer-motion';
const mainVariants = {
  'small': { width: '75px' },
  'big': { width: '200px' }
}
const innerVariants = {
  'small': { alignItems: 'center' },
  'big': { 
    alignItems: 'flex-start',
    transition: { duration: 1.5 },
   }
}


const Sidebar = () => {
  const [navSize, changeNavSize] = useState("small")
  const { colorMode, toggleColorMode } = useColorMode()
  const [ shadow, setShadow ] = useState('0px 3px 15px rgba(200,200,200,0.2)')

  const colorChange = () => {
    if (colorMode === 'light') {
        setShadow('0 4px 12px 0 rgba(0, 0, 0, 0.05)');
    } else {
        setShadow('0 4px 12px 0 #fff');
    }
  }

  return (
    <motion.div
      animate={navSize === 'small' ? 'small' : 'big'}
      style={ { marginTop: '1vh', left: '5' } }
      transition={ { ease: 'easeInOut' } }
      variants={mainVariants}
    >
      <Flex
        pos='sticky'
        h='100vh'
        boxShadow={shadow}
        flexDir='column'
        justify='space-between'
      >
        <motion.div
          animate={navSize === 'small' ? 'small' : 'big'}
          transition={ { ease: 'easeInOut' } }
          variants={innerVariants}
          style={ { display: 'flex', padding: '5%', flexDirection: 'column', width: '100%' } }
        >
          
            <IconButton
                aria-label='This is the button to open the menu'
                background="none"
                mt={5}
                _hover={{ background: 'none' }}
                icon={<FiMenu />}
                onClick={() => {
                    if (navSize == "small") changeNavSize("big")
                    else changeNavSize("small")
                }}
                style={ { alignItems: 'center' }}
            />
          
            
            <NavItem navSize={navSize} icon={FiGrid} title="Dashboard" description="See all your resolver metrics in one place." path='/' />
            <NavItem navSize={navSize} icon={FiBarChart} title="Insights" description="View valuable insights gathered from your resolver data." path='/insights' />
            <NavItem navSize={navSize} icon={FiAlertTriangle} title="Error" description="See all your errors all in one place." path='/errors' />
            <NavItem navSize={navSize} icon={FiShare2} title="Visualizer" description="Visualize your Schema AST." path='/visualizer' />
            <NavItem navSize={navSize} icon={FiStar} title="Playground" description="Connect to any GraphQL server to play around with Trace." path='/playground'/>
            <NavItem navSize={navSize} icon={FiSettings} title="Settings" description="Configure Trace to fit your needs." path='/settings'/>
        </motion.div>
      </Flex>
    </motion.div>
  )
}

export default Sidebar;
