import { Heading, keyframes } from "@chakra-ui/react";
import BreedList from "../BreedList/BreedList";

const pulse = keyframes`
  0% { text-shadow: 0 0 2px rgba(255, 255, 255, 0.3), 0 0 4px rgba(255, 255, 255, 0.2), 0 0 6px rgba(255, 255, 255, 0.1); }
  50% { text-shadow: 0 0 4px rgba(255, 255, 255, 0.4), 0 0 8px rgba(255, 255, 255, 0.3), 0 0 12px rgba(255, 255, 255, 0.2); }
  100% { text-shadow: 0 0 2px rgba(255, 255, 255, 0.3), 0 0 4px rgba(255, 255, 255, 0.2), 0 0 6px rgba(255, 255, 255, 0.1); }
`;

const AppContent = () => {
  return (
    <>
      <Heading
        as="h1"
        size="2xl"
        textAlign="start"
        bgGradient="linear(to-r, teal.400, blue.200, purple.300)"
        bgClip="text"
        fontWeight="extrabold"
        lineHeight="shorter"
        mt="5"
        ml="10"
        mb="5"
        textShadow="2px 2px #00000030"
        textDecoration="underline"
        textDecorationColor="teal.400"
        textDecorationThickness="2px"
        textDecorationStyle="solid"
        animation={`${pulse} 2s infinite ease-in-out`}
      >
        Cats And Dogs Breeds
      </Heading>
      <BreedList />
      {/* <BreedList type="dog" /> */}
    </>
  );
};

export default AppContent;
