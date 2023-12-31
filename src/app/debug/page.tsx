"use client";

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FiSun } from "react-icons/fi";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ChatMessage } from "@/types/chat";
import { debounced } from "@/lib/debounce";
import Navbar from "@/components/Navbar";
import { Journey, JourneyFileParser } from "@/lib/JourneyFileParser";
import UserJourney from "@/components/UserJourney";
import { journey2 } from "@/data/journey2";
import { toPng } from "html-to-image";

const initPrompt1 = `我会给你一个需求，你要分析用户旅程中的stage和task，并按照下面的代码格式返回给我：
\`\`\`
begin
header:
  role: string
  persona: string
  scenario: string
  goals: string
stages:
  - stage: string
    tasks:
      - task: string
        touchpoint: string
        emotion: number 1-3
  - stage: string
    tasks:
      - task: string
        touchpoint: string
        emotion: number 1-3
      - task: string
        touchpoint: string
        emotion: number 1-3
end
\`\`\`
`;

const initPrompt2 = "记住，只返回代码";

export default function ChatPage() {
  const [prompt1, setPrompt1] = useState(initPrompt1);
  const [prompt2, setPrompt2] = useState(initPrompt2);
  const [userInput, setUserInput] = useState("");

  const screenshotRef = useRef<HTMLDivElement>(null);

  const [journeyData, setJourneyData] = useState<Journey>(
    new JourneyFileParser(journey2).getJourney()
  );

  const [chatgptResponse, setChatgptResponse] = useState("");

  const scrollOutputRef: any = useRef();
  useEffect(() => {
    scrollOutputRef.current.scrollTop = scrollOutputRef.current.scrollHeight;
  }, [scrollOutputRef?.current?.scrollHeight]);

  const toast = useToast();

  const handleGenerate = async () => {
    let messages: ChatMessage[] = [];
    if (prompt1 !== "") {
      messages.push({ role: "assistant", content: prompt1 });
    }
    if (prompt2 !== "") {
      messages.push({ role: "user", content: prompt2 });
    }
    if (userInput !== "") {
      messages.push({ role: "user", content: userInput });
    }
    callChatGPT(messages);
    // updateJourneyData(responseMessage, false);
  };

  const debouncedSetJourneyData = useMemo(() => debounced(setJourneyData), []);

  useEffect(() => {
    console.log("useEffect");
  }, []);

  const callChatGPT = async (messages: ChatMessage[]) => {
    const response = await fetch("/api/generate", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(messages),
    });

    let responseMessage = "";
    const reader = response?.body?.getReader();
    const decoder = new TextDecoder();
    while (true) {
      // @ts-ignore
      const { done, value } = await reader?.read();
      if (done) {
        break;
      }
      const chunk = decoder.decode(value);
      responseMessage += chunk;
      setChatgptResponse(responseMessage);

      // stream update data
      updateJourneyData(responseMessage, false);
    }
    // final update data
    updateJourneyData(responseMessage, true);
  };

  const updateJourneyData = (chatgptResponse: string, isFinal: boolean) => {
    let tempString = chatgptResponse;
    const headerIndex = tempString.indexOf("header:");
    if (headerIndex !== -1) {
      tempString = tempString.substring(headerIndex);
    }
    const lastMarkdownIndex = tempString.lastIndexOf("end");
    if (headerIndex !== -1) {
      tempString = tempString.slice(0, lastMarkdownIndex);
    }
    console.log(tempString);
    if (isJourneyDataValid(tempString)) {
      const validJourneyData = new JourneyFileParser(tempString).getJourney();
      if (isFinal) {
        setJourneyData(validJourneyData);
      } else {
        debouncedSetJourneyData(validJourneyData);
      }
    }
  };

  const handleSaveImage = useCallback(() => {
    if (screenshotRef.current === null) {
      return;
    }

    toPng(screenshotRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [screenshotRef]);

  const isJourneyDataValid = (payload: string) => {
    try {
      new JourneyFileParser(payload);
      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <Box>
      <Navbar></Navbar>
      <Container px="0" w="80vw" centerContent>
        <Box px="8px" color="black">
          <VStack align="stretch">
            <Flex mt="24px" mb="12px" alignItems="center" gap="6px">
              <Icon color="#CC850A" as={FiSun} />
              <Text>
                Hi, you can generate a user journey map just by entering the
                prompt. Give it a try now!
              </Text>
            </Flex>
            <Heading size="sm">Prompt 1 (role: assistant)</Heading>
            <Textarea
              h="256px"
              borderColor="gray.400"
              value={prompt1}
              onChange={(e) => setPrompt1(e.target.value)}
            />
            <Heading size="sm">Prompt 2 (role: user)</Heading>
            <Textarea
              borderColor="gray.400"
              value={prompt2}
              onChange={(e) => setPrompt2(e.target.value)}
            />
            <Heading size="sm">User Input (role: user)</Heading>
            <Textarea
              borderColor="gray.400"
              placeholder="Here is a sample placeholder"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <HStack>
              <Button size="sm" colorScheme="purple" onClick={handleGenerate}>
                Generate
              </Button>
              <Button size="sm" onClick={handleSaveImage}>
                Save as image
              </Button>
            </HStack>
            <Text fontWeight="bold">AI Response</Text>
            <Text
              ref={scrollOutputRef}
              background="gray.50"
              whiteSpace="pre"
              h="200px"
              overflow="auto"
              w="80vw"
              borderRadius="8px"
              borderColor="gray.400 !important"
              border="1px solid"
              p="8px 16px"
            >
              {chatgptResponse}
            </Text>

            <Text fontWeight="bold">User Journey Map</Text>
            <Box
              minH="240px"
              w="80vw"
              py="8px"
              ref={screenshotRef}
              bgColor="#FFF"
            >
              <UserJourney userJourney={journeyData}></UserJourney>
            </Box>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}
