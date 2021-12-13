// Based off Chakra UI Responsive Sidebar Tutorial: https://github.com/bjcarlson42/chakra-left-responsive-navbar/tree/main/components

// React/Redux, Next, and Styled Components Imports
import { useState } from 'react'
import NavItem from './navitem'
import { useAppDispatch } from '../state/hooks'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/action-creators/export'
import { useRouter } from 'next/router'

// Chakra Imports
import {
  Flex,
  IconButton,
} from '@chakra-ui/react'

// Feather Icon Imports
import {
  FiMenu,
  FiGrid,
} from 'react-icons/fi'

import { BsArrowCounterclockwise } from 'react-icons/bs'

// Framer Motion
import { motion } from 'framer-motion';
const mainVariants = {
  'small': { width: '80px' },
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
  const dispatch = useAppDispatch();
  const { deleteDataActionCreator } = bindActionCreators(actionCreators, dispatch);
  const router = useRouter()

  const handleReset = () => {
    deleteDataActionCreator()
    router.reload()
  }

  return (
    <motion.div
      animate={navSize === 'small' ? 'small' : 'big'}
      style={ { left: '5' } }
      transition={ { ease: 'easeInOut' } }
      variants={mainVariants}
    >
      <Flex
        position='-webkit-sticky'
        bottom='0'
        align-self='flex-start'
        height='100vh'
        backgroundColor='blue.700'
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
            <NavItem navSize={navSize} icon={BsArrowCounterclockwise} title="Reset" description="Reset your query and resolver tracing data." onClick={handleReset} />
        </motion.div>
      </Flex>
    </motion.div>
  )
}

export default Sidebar;
