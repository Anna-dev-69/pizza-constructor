import {
  Box,
  Button,
  Card,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import pizzaImg from "../../../assets/pizza.svg";
import { IIngredients } from "../../../store/interfaces";

interface FullCardProps {
  imgSrc: string;
  title: string;
  price: number;
  ingredients: IIngredients[];
  totalAmount: number;
  id: number;
}

const FullCard: React.FC<FullCardProps> = ({
  imgSrc,
  title,
  price,
  ingredients,
  totalAmount,
  id,
}) => {
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
      <Box border="1px solid rgb(82, 167, 114)" borderRadius="lg">
        <Box
          position="relative"
          bg="rgb(244, 254, 250)"
          h="120px"
          w="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Image src={pizzaImg} alt={title} maxW="100%" objectFit="cover" />
        </Box>

        <Card.Body p={4}>
          <VStack spaceX={2} align="stretch">
            <Heading size="md" textAlign="center">
              {title}
            </Heading>

            <Text
              fontSize="lg"
              fontWeight="bold"
              color="orange.600"
              textAlign="center"
            >
              {price} руб
            </Text>
          </VStack>
        </Card.Body>
      </Box>

      {ingredients && ingredients.length > 0 && (
        <Box
          px={4}
          pb={4}
          pt={2}
          borderTop="1px solid"
          borderTopColor="gray.100"
        >
          <Text
            fontSize="sm"
            fontWeight="medium"
            color="gray.700"
            mb={2}
            textAlign="center"
          >
            Дополнительные ингредиенты:
          </Text>

          <VStack align="stretch">
            {ingredients.map((item) => (
              <HStack
                key={item.id}
                justify="space-between"
                spaceX={2}
                fontSize="sm"
              >
                <Text color="gray.600">{item.name}</Text>
                <Text color="orange.600" fontWeight="medium">
                  +{item.price} р
                </Text>
              </HStack>
            ))}
          </VStack>
        </Box>
      )}
      <Box p={2} fontWeight="medium" textAlign="center">
        <p>Общая сумма: {totalAmount}руб </p>
      </Box>

      <Card.Footer pt={4} m={2} borderTop="1px solid" borderTopColor="gray.100">
        <HStack spaceX={3} w="full"></HStack>
      </Card.Footer>
    </Card.Root>
  );
};

export default FullCard;
