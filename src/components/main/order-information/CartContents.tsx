import { IPizza } from "../../../store/interfaces";
import {
  Box,
  CardBody,
  CardHeader,
  CardRoot,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";

interface CartContentsProps {
  basket: IPizza[];
  total: number;
}

const CartContents = ({ basket, total }: CartContentsProps) => {
  return (
    <CardRoot>
      <CardHeader bg="blue.50" borderRadius="md">
        <Heading size="md" color="blue.600">
          Состав заказа
        </Heading>
      </CardHeader>
      <CardBody p={4}>
        <VStack align="stretch">
          {basket.map((item) => (
            <Box key={item.id}>
              <HStack justify="space-between" mb={2}>
                <Text fontWeight="bold" fontSize="lg">
                  {item.name}
                </Text>
                <Text fontWeight="bold" color="green.600">
                  {item.totalAmount} руб
                </Text>
              </HStack>

              {item.selectedIngredients &&
                item.selectedIngredients.length > 0 && (
                  <VStack align="stretch">
                    <Text fontSize="sm" color="gray.500" fontWeight="medium">
                      Дополнительные ингредиенты:
                    </Text>
                    {item.selectedIngredients.map((ingredient) => (
                      <HStack key={ingredient.id} justify="space-between">
                        <Text fontSize="sm" color="gray.600">
                          {ingredient.name}
                        </Text>
                        <Text fontSize="sm" color="orange.500">
                          +{ingredient.price} руб
                        </Text>
                      </HStack>
                    ))}
                  </VStack>
                )}
            </Box>
          ))}

          <HStack justify="space-between" pt={2}>
            <Text fontSize="lg" fontWeight="bold">
              Итого:
            </Text>
            <Text fontSize="xl" fontWeight="bold" color="green.600">
              {total} руб
            </Text>
          </HStack>
        </VStack>
      </CardBody>
    </CardRoot>
  );
};

export default CartContents;
