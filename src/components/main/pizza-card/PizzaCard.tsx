import {
  Box,
  Button,
  Card,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

import pizza from "../../../assets/pizza.svg";
import { useStore } from "../../../store/store";
import { IIngredients } from "../../../store/interfaces";

interface PizzaCardProps {
  // imgSrc: string;
  title: string;
  price: number;
  ingredients: IIngredients[];
  onOpenModal: (val: boolean) => void;
  pizzaId: number;
}

const PizzaCard: React.FC<PizzaCardProps> = ({
  title,
  price,
  onOpenModal,
  pizzaId,
}) => {
  return (
    <Card.Root
      maxW="sm"
      boxShadow="md"
      borderRadius="lg"
      overflow="hidden"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "2xl",
        transition: "0.3s",
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
        <Image src={pizza} alt={title} maxW="100%" />
      </Box>

      <Card.Body
        p={1}
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
      >
        <Stack gap={0}>
          <Heading size="lg">{title}</Heading>
          <Text fontSize="sm">{price} руб</Text>
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
          p={2}
          bg="rgb(248, 150, 76)"
          _hover={{ bg: "rgb(230,130,50)" }}
          onClick={() => {
            onOpenModal(true);
            useStore.getState().addToCart(pizzaId);
          }}
        >
          Добавить в корзину
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};

export default PizzaCard;
