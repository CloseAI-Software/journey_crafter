"use client";

import {
  Box,
  VStack,
  Text,
  Flex,
  Center,
  Heading,
  Input,
  Button,
  Textarea,
  InputGroup,
  InputRightElement,
  useToast,
  useColorModeValue,
  Container,
  Icon,
} from "@chakra-ui/react";
import JourneySvg from "@/svg/journey.svg";
import { SunIcon } from "@/icons/sun";
import { FiSun } from "react-icons/fi";

export default function ChatPage() {
  return (
    <Box>
      <Flex
        w="100vw"
        h="64px"
        px="32px"
        borderBottom="1px solid"
        borderColor="gray.200"
        alignItems="center"
        gap="6px"
      >
        <Icon>
          <svg
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.447 3.10523L13.447 0.105228C13.3081 0.0357071 13.1549 -0.000488281 12.9995 -0.000488281C12.8441 -0.000488281 12.6909 0.0357071 12.552 0.105228L7 2.88223L1.447 0.105228C1.2945 0.029025 1.12506 -0.00692733 0.954757 0.000785589C0.784455 0.00849851 0.618953 0.0596205 0.473969 0.149296C0.328985 0.238972 0.209334 0.364223 0.126379 0.513155C0.0434244 0.662086 -7.93497e-05 0.829752 1.08651e-07 1.00023V14.0002C1.08651e-07 14.3792 0.214 14.7252 0.553 14.8952L6.553 17.8952C6.69193 17.9647 6.84515 18.0009 7.0005 18.0009C7.15585 18.0009 7.30907 17.9647 7.448 17.8952L13 15.1182L18.553 17.8942C18.7051 17.9712 18.8744 18.0076 19.0446 18.0001C19.2149 17.9925 19.3803 17.9413 19.525 17.8512C19.82 17.6682 20 17.3472 20 17.0002V4.00023C20 3.62123 19.786 3.27523 19.447 3.10523ZM8 4.61823L12 2.61823V13.3822L8 15.3822V4.61823ZM2 2.61823L6 4.61823V15.3822L2 13.3822V2.61823ZM18 15.3822L14 13.3822V2.61823L18 4.61823V15.3822Z"
              fill="#F2617A"
            />
          </svg>
        </Icon>
        <Heading size="sm" fontFamily="Bitter" fontWeight="bold">
          JourneyCrafter
        </Heading>
      </Flex>
      <Container px="0" maxW="960px" centerContent>
        <Box w="960px" color="black">
          <VStack align="stretch">
            <Flex mt="24px" mb="12px" alignItems="center" gap="6px">
              <Icon color="#CC850A" as={FiSun} />
              <Text>
                Hi, you can generate a user journey map just by entering the
                prompt. Give it a try now!
              </Text>
            </Flex>
            <Heading size="sm">Prompt</Heading>
            <Textarea
              borderColor="gray.200"
              placeholder="Here is a sample placeholder"
            />
            <Button w="84px" size="sm" colorScheme="purple">
              Generate
            </Button>
            <Box
              h="240px"
              w="100%"
              borderRadius="8px"
              borderColor="gray.200 !important"
              border="1px solid"
              p="8px 16px"
            >
              User journey placeholder 1
            </Box>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}