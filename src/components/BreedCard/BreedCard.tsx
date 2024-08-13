import { Breed } from "@/types/petsTypes";
import { Box, Image, Text } from "@chakra-ui/react";
import Link from "next/link";

interface BreedCardProps {
  breed: Breed;
}

const BreedCard: React.FC<BreedCardProps> = ({ breed }) => {

  const extractAnimalType = (url: string): string | null => {
    const regex = /(dog|cat)/;
    const match = url.match(regex);
    return match ? match[0] : null;
  };

  const type = extractAnimalType(breed.image.url);

  return (
    <Link href={`/${type}/${breed.id}`} passHref>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p="4"
        height={{ base: "250px", md: "340px" }}
        width={{ base: "135px", sm: "200px", md: "230px" }}
        _hover={{
          boxShadow: "xl",
          cursor: "pointer",
          transform: "scale(1.05)",
          bgGradient: "linear(to-br, blue.300, blue.100)",
        }}
        transition="transform 0.3s ease, background 0.3s ease"
        bg="rgba(255, 255, 255, 0.8)"
        borderColor="blue.200"
        backdropFilter="blur(10px)"
      >
        <Image
          src={breed.image.url}
          alt={breed.name}
          margin="auto"
          borderRadius="md"
          height={{ base: "150px", md: "200px" }}
          width={{ base: "120px", md: "192px" }}
          objectFit="cover"
        />
        <Text
          fontSize={{ base: "lg", md: "xl" }}
          fontWeight="bold"
          color="blue.800"
        >
          {breed.name}
        </Text>
        <Text color="blue.500">{breed.origin}</Text>
      </Box>
    </Link>
  );
};

export default BreedCard;
