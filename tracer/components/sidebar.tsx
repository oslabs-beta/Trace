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
  Heading
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
const variants = {
  'small': { width: '75px' },
  'big': { width: '200px' }
}

const Sidebar = () => {
  const [navSize, changeNavSize] = useState("small")

  return (
    <motion.div
      animate={navSize === 'small' ? 'small' : 'big'}
      style={ { marginTop: '1vh', left: '5' } }
      transition={ { ease: 'easeInOut' } }
      variants={variants}
    >
      <Flex
        pos='sticky'
        h='100vh'
        boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.05)'
        flexDir='column'
        justify='space-between'
      >
        <Flex
          p="5%"
          flexDir="column"
          w="100%"
          alignItems={navSize == "small" ? "center" : "flex-start"}
          as="nav"
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
            />
          
          
            <NavItem navSize={navSize} icon={FiGrid} title="Dashboard" description="See all your resolver metrics in one place." path='/' />
            <NavItem navSize={navSize} icon={FiBarChart} title="Insights" description="View valuable insights gathered from your resolver data." path='/insights' />
            <NavItem navSize={navSize} icon={FiAlertTriangle} title="Error" description="See all your errors all in one place." path='/errors' />
            <NavItem navSize={navSize} icon={FiShare2} title="Visualizer" description="Visualize your Schema AST." path='/visualizer' />
            <NavItem navSize={navSize} icon={FiStar} title="Playground" description="Connect to any GraphQL server to play around with Trace." path='/playground'/>
            <NavItem navSize={navSize} icon={FiSettings} title="Settings" description="Configure Trace to fit your needs." path='/settings'/>
        </Flex>
      </Flex>
    </motion.div>
  )
}

export default Sidebar;
