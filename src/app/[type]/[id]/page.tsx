"use client";

import { getCatImages, getDogBreeds } from "@/api/pets";
import { useEffect, useState } from "react";
import {
  Box,
  Image,
  Text,
  Heading,
  Grid,
  Stack,
  Badge,
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  IconButton,
  HStack,
  useBreakpointValue,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Breed, BreedImage } from "@/types/petsTypes";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const BreedDetails = ({ params }: { params: { id: string; type: string } }) => {
  const { id, type } = params;
  const [breedWithImages, setBreedWithImages] = useState<BreedImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [dogsBreeds, setDogsBreeds] = useState<Breed[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<Breed | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const router = useRouter();

  const isDesktopOrLarger = useBreakpointValue({ base: false, md: true });

  useEffect(() => {
    if (type === "cat") {
      getCatImages(id).then((response: any) => {
        setBreedWithImages(response);
        setSelectedImage(response[0]?.url || null);
        setCurrentImageIndex(0);
      });
    } else if (type === "dog") {
      getDogBreeds().then((response: any) => {
        setDogsBreeds(response);
        const selectedDog = response.find(
          (breed: any) => breed.id === Number(id)
        );
        setSelectedBreed(selectedDog || null);
        setSelectedImage(selectedDog?.image?.url || null);
        setCurrentImageIndex(0);
      });
    }
  }, [type, id]);

  const breed = type === "cat" ? breedWithImages[0]?.breeds[0] : selectedBreed;

  const breedName = breed ? breed.name : "No name";
  const breedDescription = breed
    ? breed.description || "No description available."
    : "No description available.";
  const breedWeight = breed ? breed.weight?.metric || "N/A" : "N/A";
  const breedTemperament = breed ? breed.temperament || "N/A" : "N/A";
  const breedLifeSpan = breed ? breed.life_span || "N/A" : "N/A";

  useEffect(() => {
    console.log("breedWithImages", breedWithImages);
    console.log("breed", breed);
  }, [breedWithImages, breed]);

  const handleImageClick = (url: string, index: number) => {
    if (isDesktopOrLarger) {
      setSelectedImage(url);
      setCurrentImageIndex(index);
      setIsModalOpen(true);
    } else {
      setSelectedImage(url);
    }
  };

  const handleNextImage = () => {
    if (breedWithImages.length > 0) {
      const nextIndex = (currentImageIndex + 1) % breedWithImages.length;
      setCurrentImageIndex(nextIndex);
      setSelectedImage(breedWithImages[nextIndex].url);
    }
  };

  const handlePreviousImage = () => {
    if (breedWithImages.length > 0) {
      const prevIndex = (currentImageIndex - 1 + breedWithImages.length) % breedWithImages.length;
      setCurrentImageIndex(prevIndex);
      setSelectedImage(breedWithImages[prevIndex].url);
    }
  };

  if (!breedWithImages.length && !selectedBreed) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box p={{ base: "4", md: "8" }} maxW="1400px" mx="auto">
      <Heading
        position="relative"
        as="h1"
        size="2xl"
        textAlign="center"
        bgGradient="linear(to-r, cyan.300, blue.400)"
        bgClip="text"
        fontWeight="extrabold"
        mb="8"
        zIndex="1000"
        height="60px"
      >
        {breedName}
      </Heading>
      <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap="8">
        <Box>
          <Image
            src={selectedImage || "/placeholder.jpg"}
            alt={breedName}
            borderRadius="lg"
            boxShadow="lg"
            objectFit="cover"
            width={{ base: "100%", md: "600px" }}
            height={{ base: "400px", md: "400px" }}
            mb={{ base: "4", md: "4" }}
            cursor="pointer"
            onClick={() =>
              handleImageClick(selectedImage || "/placeholder.jpg", 0)
            }
          />
          <Grid
            templateColumns={{
              base: "repeat(3, 1fr)",
              sm: "repeat(4, 1fr)",
              md: "repeat(5, 1fr)",
            }}
            gap={4}
          >
            {breedWithImages.map((image, index) => (
              <Image
                key={image.id}
                src={image.url}
                alt={breedName}
                borderRadius="lg"
                boxShadow="md"
                objectFit="cover"
                width="100%"
                height="100px"
                cursor="pointer"
                onClick={() => handleImageClick(image.url, index)}
                border={selectedImage === image.url ? "2px solid cyan" : "none"}
              />
            ))}
          </Grid>
        </Box>
        <Box>
          <Stack spacing="6">
            {type === "cat" && (
              <Box>
                <Text fontSize="xl" fontWeight="bold" color="cyan.400">
                  Description
                </Text>
                <Text
                  fontSize="md"
                  color="blue.200"
                  textShadow="0px 0px 8px rgba(0, 255, 255, 0.8)"
                >
                  {breedDescription}
                </Text>
              </Box>
            )}

            <Box>
              <Text fontSize="xl" fontWeight="bold" color="cyan.400">
                Weight
              </Text>
              <Text
                fontSize="md"
                color="blue.200"
                textShadow="0px 0px 8px rgba(0, 255, 255, 0.8)"
              >
                {breedWeight} kg
              </Text>
            </Box>

            <Box>
              <Text fontSize="xl" fontWeight="bold" color="cyan.400">
                Temperament
              </Text>
              <Text fontSize="md" color="gray.700">
                {breedTemperament.split(", ").map((trait, index) => (
                  <Badge
                    key={index}
                    colorScheme="cyan"
                    mr="2"
                    mb="2"
                    px="2"
                    py="1"
                    borderRadius="full"
                    fontSize="0.9em"
                  >
                    {trait}
                  </Badge>
                ))}
              </Text>
            </Box>

            <Box>
              <Text fontSize="xl" fontWeight="bold" color="cyan.400">
                Life Span
              </Text>
              <Text
                fontSize="md"
                color="blue.100"
                textShadow="0px 0px 8px rgba(0, 255, 255, 0.8)"
              >
                {breedLifeSpan}
              </Text>
            </Box>
          </Stack>
        </Box>
      </Grid>
      <Flex justifyContent="end">
        <Button bg="blue.200" color="blue.800" onClick={() => router.back()}>
          Go to back
        </Button>
      </Flex>

      {isDesktopOrLarger && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ModalOverlay />
          <ModalContent bg="none" minWidth="600px">
            <ModalCloseButton right="20px" />
            <ModalBody>
              <HStack spacing={4} justify="center" align="center">
                <IconButton
                  icon={<ChevronLeftIcon />}
                  aria-label="Previous image"
                  onClick={handlePreviousImage}
                  isDisabled={breedWithImages.length <= 1}
                  height="350px"
                  bg="blue.300"
                />
                <Image
                  src={selectedImage || "/placeholder.jpg"}
                  alt="Selected"
                  borderRadius="lg"
                  boxShadow="lg"
                  objectFit="cover"
                  width="100%"
                  height="auto"
                />
                <IconButton
                  icon={<ChevronRightIcon />}
                  aria-label="Next image"
                  onClick={handleNextImage}
                  isDisabled={breedWithImages.length <= 1}
                  height="350px"
                  bg="blue.300"
                />
              </HStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default BreedDetails;
