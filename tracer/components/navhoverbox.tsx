import React from 'react'
import {
    Flex,
    Heading,
    Text,
    Icon
} from '@chakra-ui/react'
import { IconType } from 'react-icons'
import { motion, AnimatePresence } from "framer-motion"

type Props = {
    title: string;
    icon: IconType;
    description: string | undefined;
}

export default function NavHoverBox({ title, icon, description }: Props) {
    return (
        <>
            <Flex
                pos="absolute"
                mt="calc(100px - 7.5px)"
                ml="-10px"
                width={0}
                height={0}
                borderTop="10px solid transparent"
                borderBottom="10px solid transparent"
                borderRight="10px solid #82AAAD"
            />
            <Flex
                h={200}
                minWidth={200}
                w="100%"
                flexDir="column"
                alignItems="center"
                justify="center"
                backgroundColor="#82AAAD"
                borderRadius="10px"
                color="#fff"
                textAlign="center"
            >
                <Icon as={icon} fontSize="3xl" mb={4} />
                <Heading size="md" fontWeight="normal">{title}</Heading>
                <Text
                    w={180}
                >{description}</Text>
            </Flex>
        </>
    )
}