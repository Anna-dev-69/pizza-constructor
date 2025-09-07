import {
  Box,
  Card,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import pizzaImg from "../../../assets/pizza.svg";
import { IIngredients, IPizza } from "../../../store/interfaces";
import IngredientsList from "./IngredientsList";

interface FullCardProps {
  ingredients: IIngredients[];
  pizza: IPizza;
}

const FullCard: React.FC<FullCardProps> = ({ pizza, ingredients }) => {
  return (
    <Card.Root
      maxW="sm"
      boxShadow="md"
      borderRadius="lg"
      overflow="hidden"
      transition="all 0.2s ease"
      _hover={{
        transform: "translateY(-2px)",
        boxShadow: "lg",
      }}
    >
      <Box border="1px solid rgb(82, 167, 114)" borderRadius="lg" p={1}>
        <Box
          position="relative"
          bg="rgb(244, 254, 250)"
          h="120px"
          w="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Image
            src={pizzaImg}
            alt={pizza.name}
            maxW="100%"
            objectFit="cover"
          />
        </Box>

        <Card.Body p={4}>
          <VStack spaceX={2} align="stretch">
            <Heading size="md" textAlign="center">
              {pizza.name}
            </Heading>

            <Text
              fontSize="lg"
              fontWeight="bold"
              color="orange.600"
              textAlign="center"
            >
              {pizza.price} руб
            </Text>
          </VStack>
        </Card.Body>
      </Box>

      {!!ingredients.length && <IngredientsList ingredients={ingredients} />}
      <Box p={2} fontWeight="medium" textAlign="center">
        <p>Общая сумма: {pizza.totalAmount}руб </p>
      </Box>

      <Card.Footer pt={4} m={2} borderTop="1px solid" borderTopColor="gray.100">
        <HStack spaceX={3} w="full"></HStack>
      </Card.Footer>
    </Card.Root>
  );
};

export default FullCard;
