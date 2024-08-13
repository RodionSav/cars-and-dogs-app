import { useState, useEffect } from "react";
import { Box, Flex, Spinner, Button, Text, useBreakpointValue } from "@chakra-ui/react";
import BreedCard from "../BreedCard/BreedCard";
import { getCatBreeds, getDogBreeds } from "@/api/pets";
import { Breed } from "@/types/petsTypes";

interface BreedListProps {
  itemsPerPage?: number;
}

const BreedList: React.FC<BreedListProps> = ({ itemsPerPage = 6 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [breeds, setBreeds] = useState<Breed[]>([]);

  const totalPages = Math.ceil(breeds.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginationPets = breeds.slice(startIndex, endIndex);

  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    const fetchBreeds = async () => {
      setLoading(true);
      try {
        // @ts-ignore
        const [catBreeds, dogBreeds]: [Breed[], Breed[]] = await Promise.all([
          getCatBreeds(),
          getDogBreeds(),
        ]);

        const combinedBreeds = [...catBreeds, ...dogBreeds];
        const shuffledBreeds = combinedBreeds.sort(() => Math.random() - 0.5);

        setBreeds(shuffledBreeds);
      } catch (error) {
        console.error("Error fetching breeds:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBreeds();
  }, []);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPaginationButtons = () => {
    if (isSmallScreen) {
      const minPage = Math.max(1, currentPage - 1);
      const maxPage = Math.min(totalPages, currentPage + 1);
      return Array.from({ length: maxPage - minPage + 1 }, (_, i) => minPage + i);
    } else {
      return Array.from(
        { length: Math.min(totalPages, 5) },
        (_, i) => i + Math.max(1, Math.min(currentPage - 2, totalPages - 4))
      );
    }
  };

  return (
    <Box mb="8">
      <Flex
        margin="auto"
        as="ul"
        listStyleType="none"
        p="0"
        mt="2"
        gap="10px"
        height={{ base: "780px", sm: "810px", md: "700px" }}
        width={{ base: "300px", sm: "410px", md: "710px" }}
        flexWrap="wrap"
        justifyContent={{ base: "center", sm: "start", md: "start" }}
      >
        {loading ? (
          <Spinner margin="auto" color="blue.300" width="70px" height="70px" />
        ) : breeds.length > 0 ? (
          paginationPets.map((breed) => (
            <BreedCard key={breed.id} breed={breed} />
          ))
        ) : (
          <Text color="blue.300">No breeds found.</Text>
        )}
      </Flex>

      <Flex justify="center" mt="4" gap="2" wrap="wrap">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          isDisabled={currentPage === 1}
          colorScheme="blue"
          width={{ base: "25px", sm: "50px", md: "50px" }}
        >
          Prev
        </Button>
        <Button
          display={{ base: "none", md: currentPage > 2 ? "inline-flex" : "none" }}
          colorScheme="blue"
          isDisabled={true}
          width={{ base: "20px" }}
        >
          ...
        </Button>
        {getPaginationButtons().map((page) => (
          <Button
            key={page}
            onClick={() => handlePageChange(page)}
            colorScheme="blue"
            variant={currentPage === page ? "solid" : "outline"}
            width={{ base: "20px" }}
          >
            {page}
          </Button>
        ))}
        <Button
          display={{ base: "none", md: currentPage > totalPages - 2 ? "none" : "inline-flex" }}
          colorScheme="blue"
          isDisabled={true}
          width={{ base: "20px" }}
        >
          ...
        </Button>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          isDisabled={currentPage === totalPages}
          colorScheme="blue"
          width={{ base: "25px", sm: "50px", md: "50px" }}
        >
          Next
        </Button>
      </Flex>
    </Box>
  );
};

export default BreedList;
