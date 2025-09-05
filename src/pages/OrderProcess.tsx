import { useState } from "react";
import UserDataFrom from "../components/main/user-data-from/UserDataFrom";
import {
  Button,
  ButtonGroup,
  Stack,
  Steps,
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Badge,
} from "@chakra-ui/react";
import OrderInformation from "../components/main/order-information/OrderInformation";
import { useStore } from "./../store/store";
import { Link } from "react-router-dom";

const OrderProcess = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    phone: "",
    address: "",
    comment: "",
  });
  const basket = useStore((s) => s.basket);
  const total = useStore((s) => s.total);

  const steps = [
    {
      title: "Корзина",
      description: "",
    },
    {
      title: "Данные",
      description: "",
    },
    {
      title: "Подтверждение",
      description: "",
    },
  ];

  return (
    <Box p={4}>
      <Steps.Root
        maxW="1200px"
        mx="auto"
        orientation="horizontal"
        step={currentStep}
        count={steps.length}
        onStepChange={(details) => setCurrentStep(details.step)}
      >
        <Steps.List>
          {steps.map((step, index) => (
            <Steps.Item
              key={index}
              index={index}
              title={step.title}
              colorPalette="green"
            >
              <Steps.Indicator />
              <Steps.Separator />
            </Steps.Item>
          ))}
        </Steps.List>

        <Stack mt={8} spaceX={4}>
          {steps.map((step, index) => (
            <Steps.Content key={index} index={index}>
              <Box p={4} border="1px" borderColor="gray.200" borderRadius="md">
                {step.description}

                {step.title === "Корзина" && index === 0 && (
                  <Box
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                  >
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
                          <Text fontWeight="medium">{item.name}</Text>
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
                      onFormData={setFormData}
                      onCurrentStep={setCurrentStep}
                    />
                  </Box>
                )}

                {index === 2 && (
                  <Box
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                  >
                    <OrderInformation
                      basket={basket}
                      formData={formData}
                      total={total}
                    />
                    <Button
                      p={2}
                      onClick={() => {
                        setCurrentStep(3);
                        setIsOrderPlaced(true);
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
          ))}

          {isOrderPlaced && (
            <Steps.CompletedContent>
              <Box p={4} bg="green.100" borderRadius="md">
                Заказ оформлен!
              </Box>

              <Button
                color="blue.500"
                fontSize="sm"
                fontWeight="medium"
                _hover={{
                  color: "blue.600",
                  textDecoration: "none",
                }}
                bg="transparent"
              >
                <Link to="/">Вернуться на главную страницу</Link>
              </Button>
            </Steps.CompletedContent>
          )}
          {currentStep === 0 && (
            <ButtonGroup size="md" variant="outline">
              <Steps.PrevTrigger asChild>
                <Button p={2}>Назад</Button>
              </Steps.PrevTrigger>
              <Steps.NextTrigger asChild>
                <Button p={2}>Далее</Button>
              </Steps.NextTrigger>
            </ButtonGroup>
          )}
        </Stack>
      </Steps.Root>
    </Box>
  );
};

export default OrderProcess;
