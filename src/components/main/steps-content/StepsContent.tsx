import {
  Badge,
  Box,
  Button,
  Heading,
  HStack,
  Steps,
  Text,
  VStack,
} from "@chakra-ui/react";
import UserDataFrom, { FormValues } from "../user-data-from/UserDataFrom";
import OrderInformation from "../order-information/OrderInformation";
import { IPizza } from "@/store/interfaces";
import { toaster } from "../../ui/toaster";
import { useStore } from "../../../store/store";

interface StepsContentProps {
  index: number;
  basket: IPizza[];
  formData: FormValues;
  onFormData: (val: FormValues) => void;
  onCurrentStep: (val: number) => void;
  total: number;
}

const StepsContent = ({
  index,
  basket,
  formData,
  onFormData,
  onCurrentStep,
  total,
}: StepsContentProps) => {
  return (
    <Steps.Content key={index} index={index}>
      <Box p={4} border="1px" borderColor="gray.200" borderRadius="md">
        {index === 0 && (
          <Box display="flex" alignItems="center" flexDirection="column">
            <Heading size="md" mb={4} color="gray.700">
              Содержимое корзины
            </Heading>

            <VStack
              w="100%"
              align="stretch"
              borderWidth={1}
              borderRadius="lg"
              p={4}
              borderColor="gray.200"
            >
              {basket.map((item) => (
                <HStack
                  key={item.id}
                  justify="space-between"
                  p={2}
                  _hover={{ bg: "gray.50" }}
                  borderRadius="md"
                >
                  <Box>
                    <Text fontWeight="medium">{item.name}</Text>

                    <Text color="green">Доп. ингредиенты:</Text>
                    <Box>
                      {item.selectedIngredients.map((ingredient) => (
                        <HStack key={ingredient.id}>
                          <Text fontSize="xs">
                            {ingredient.name}-{ingredient.price}руб
                          </Text>
                        </HStack>
                      ))}
                    </Box>
                  </Box>
                  <Badge colorScheme="green" variant="subtle">
                    {item.totalAmount} руб
                  </Badge>
                </HStack>
              ))}

              <HStack justify="space-between" pt={2}>
                <Text fontSize="lg" fontWeight="bold">
                  Общая стоимость:
                </Text>
                <Text fontSize="xl" fontWeight="bold" color="green.600">
                  {total} руб
                </Text>
              </HStack>
            </VStack>
          </Box>
        )}

        {index === 1 && (
          <Box>
            <Heading mb={5}>Введите контактную информацию</Heading>
            <UserDataFrom
              onFormData={onFormData}
              onCurrentStep={onCurrentStep}
            />
          </Box>
        )}

        {index === 2 && (
          <Box display="flex" alignItems="center" flexDirection="column">
            <OrderInformation
              basket={basket}
              formData={formData}
              total={total}
            />
            <Button
              p={2}
              onClick={() => {
                onCurrentStep(3);

                toaster.create({
                  title: "Заказ оформлен!",
                  type: "success",
                });
                useStore.setState({ basket: [] });
              }}
              mt={4}
              bg="rgb(82, 167, 114)"
              transition="background-color 300ms"
              _hover={{ bg: "rgba(82, 167, 115, 0.75)" }}
            >
              Подтвердить заказ
            </Button>
          </Box>
        )}
      </Box>
    </Steps.Content>
  );
};

export default StepsContent;
