import {
  Box,
  Button,
  Card,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

import pizzaImg from "../../../assets/pizza.svg";
import { useStore } from "../../../store/store";
import { IPizza } from "../../../store/interfaces";
import colors from "../../../shared/colors";

interface PizzaCardProps {
  onOpenModal: (val: boolean) => void;
  pizza: IPizza;
}

const PizzaCard: React.FC<PizzaCardProps> = ({ pizza, onOpenModal }) => {
  return (
    <Card.Root
      maxW="sm"
      boxShadow="md"
      borderRadius="lg"
      overflow="hidden"
      transition="all 0.3s ease"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "2xl",
      }}
    >
      <Box
        p={4}
        display="flex"
        justifyContent="center"
        alignItems="center"
        h="120px"
        w="100%"
      >
        <Image src={pizzaImg} alt={pizza.name} maxW="100%" />
      </Box>

      <Card.Body
        p={1}
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
      >
        <Stack gap={0}>
          <Heading size="lg">{pizza.name}</Heading>
          <Text fontSize="sm">{pizza.price} руб</Text>
        </Stack>
      </Card.Body>

      <Card.Footer
        p={3}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Button
          variant="solid"
          bg={colors.orange[100]}
          _hover={{ bg: colors.orange[200] }}
          p={{ base: 2, sm: 2 }}
          fontSize={{ base: "sm", md: "md" }}
          w={{ base: "80%", sm: "auto" }}
          maxW="300px"
          onClick={() => {
            onOpenModal(true);
            useStore.getState().addToCart(pizza.id);
          }}
        >
          Добавить в корзину
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};

export default PizzaCard;
