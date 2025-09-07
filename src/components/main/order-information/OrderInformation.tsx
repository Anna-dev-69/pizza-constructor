import {
  Box,
  CardBody,
  CardHeader,
  CardRoot,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FormValues } from "../user-data-from/UserDataFrom";
import { IPizza } from "../../../store/interfaces";
import CartContents from "./CartContents";
import InfoItem from "./InfoItem";

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

        <CartContents basket={basket} total={total} />

        <CardRoot>
          <CardHeader bg="green.50" borderRadius="md">
            <Heading size="md" color="green.600">
              Информация о клиенте
            </Heading>
          </CardHeader>
          <CardBody p={4}>
            <SimpleGrid columns={{ base: 1, md: 2 }}>
              <InfoItem title="Имя" value={formData.firstName} />
              <InfoItem title="Телефон" value={formData.phone} />
              <InfoItem title="Адрес доставки" value={formData.address} />
              <InfoItem title="Комментарий" value={formData.comment} />
            </SimpleGrid>
          </CardBody>
        </CardRoot>

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
