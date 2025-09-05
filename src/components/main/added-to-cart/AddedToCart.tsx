import { IPizza, useStore } from "../../../store/store";
import {
  Box,
  Button,
  Card,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import pizzaImg from "../../../assets/pizza.svg";
import deleteIcon from "../../../assets/delete.svg";

interface AddedToCartProps {
  basket: IPizza[];
}

const AddedToCart: React.FC<AddedToCartProps> = ({ basket }) => {
  if (basket.length === 0) {
    return (
      <Box textAlign="center" py={10}>
        <Text fontSize="xl" color="gray.500">
          Корзина пуста
        </Text>
      </Box>
    );
  }

  return (
    <SimpleGrid
      columns={{ base: 1, md: 2, lg: 3 }}
      gap="20px"
      p={4}
      mt={4}
      flexShrink={0}
    >
      {basket.map((pizza) => (
        <Card.Root
          position="relative"
          maxW="sm"
          boxShadow="md"
          borderRadius="xl"
          overflow="hidden"
          transition="all 0.3s ease"
          _hover={{
            transform: "translateY(-4px)",
            boxShadow: "lg",
          }}
          key={pizza.id}
          w={250}
          p={2}
        >
          <Button
            onClick={() => useStore.getState().removeFromCart(pizza.id)}
            _hover={{ bg: "transparent" }}
            colorScheme="red"
            variant="ghost"
            paddingLeft={4}
            position="absolute"
            right={2}
            top={1}
            zIndex={9999}
          >
            <Image src={deleteIcon} />
          </Button>
          <Box
            h="120px"
            w="100%"
            overflow="hidden"
            position="relative"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Image
              src={pizzaImg}
              alt={pizza.name}
              w="120px"
              h="100%"
              objectFit="cover"
            />
          </Box>

          <Card.Body
            p={6}
            display="flex"
            flexDirection="column"
            alignItems="center"
            textAlign="center"
          >
            <VStack spaceX={3} w="full">
              <Heading size="md" color="gray.800" fontWeight="bold">
                {pizza.name}
              </Heading>

              <Text fontSize="xl" fontWeight="bold" color="orange.500">
                {pizza.totalAmount} руб
              </Text>

              {pizza.selectedIngredients.length === 0 ? (
                <Box
                  p={2}
                  bg="orange.50"
                  borderRadius="lg"
                  border="1px solid"
                  borderColor="orange.100"
                  w="full"
                >
                  <Text
                    fontSize="xs"
                    fontWeight="medium"
                    color="orange.600"
                    mb={2}
                  >
                    Без доп. ингредиентов:
                  </Text>
                </Box>
              ) : (
                <Box
                  p={2}
                  bg="orange.50"
                  borderRadius="lg"
                  border="1px solid"
                  borderColor="orange.100"
                  w="full"
                >
                  <Text
                    fontSize="xs"
                    fontWeight="medium"
                    color="orange.600"
                    mb={2}
                  >
                    Доп. ингредиенты:
                  </Text>
                  <VStack align="stretch">
                    {pizza.selectedIngredients.map((ingredient, index) => (
                      <HStack
                        key={index}
                        justify="space-between"
                        spaceX={2}
                        fontSize="xs"
                      >
                        <Text color="gray.700">{ingredient.name}</Text>
                        <Text color="orange.600" fontWeight="medium">
                          +{ingredient.price} руб
                        </Text>
                      </HStack>
                    ))}
                  </VStack>
                </Box>
              )}
            </VStack>
          </Card.Body>
        </Card.Root>
      ))}
    </SimpleGrid>
  );
};

export default AddedToCart;
