import { IPizza } from "../../../store/store";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  CardRoot,
  Container,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FormValues } from "../user-data-from/UserDataFrom";

interface OrderInformationProp {
  basket: IPizza[];
  formData: FormValues;
  total: number;
}

const OrderInformation = ({
  basket,
  formData,
  total,
}: OrderInformationProp) => {
  return (
    <Container maxW="container.md" py={6}>
      <VStack spaceX={8} align="stretch">
        <Heading size="lg" textAlign="center" color="gray.700">
          Информация о заказе
        </Heading>

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
                        <Text
                          fontSize="sm"
                          color="gray.500"
                          fontWeight="medium"
                        >
                          Дополнительные ингредиенты:
                        </Text>
                        {item.selectedIngredients.map((ingredient) => (
                          <HStack key={ingredient.id} justify="space-between">
                            <Text fontSize="sm" color="gray.600">
                              • {ingredient.name}
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

        <CardRoot>
          <CardHeader bg="green.50" borderRadius="md">
            <Heading size="md" color="green.600">
              Информация о клиенте
            </Heading>
          </CardHeader>
          <CardBody p={4}>
            <SimpleGrid columns={{ base: 1, md: 2 }}>
              <Box>
                <Text fontWeight="bold" color="gray.600" mb={1}>
                  Имя:
                </Text>
                <Text fontSize="lg">{formData.firstName}</Text>
              </Box>

              <Box>
                <Text fontWeight="bold" color="gray.600" mb={1}>
                  Телефон:
                </Text>
                <Text fontSize="lg">{formData.phone}</Text>
              </Box>

              <Box>
                <Text fontWeight="bold" color="gray.600" mb={1}>
                  Адрес доставки:
                </Text>
                <Text fontSize="lg">{formData.address}</Text>
              </Box>

              {formData.comment && (
                <Box>
                  <Text fontWeight="bold" color="gray.600" mb={1}>
                    Комментарий:
                  </Text>
                  <Text fontSize="lg">{formData.comment}</Text>
                </Box>
              )}
            </SimpleGrid>
          </CardBody>
        </CardRoot>

        {/* Подтверждение */}
        <Box textAlign="center" py={4}>
          <Text fontSize="lg" color="gray.600">
            Нажмите "Подтвердить заказ" для завершения оформления
          </Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default OrderInformation;
