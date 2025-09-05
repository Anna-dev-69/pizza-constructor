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

export interface IIngredients {
  id: string;
  name: string;
  price: number;
}

interface PizzaCardProps {
  imgSrc: string;
  title: string;
  price: number;
  ingredients: IIngredients[];
  pizzaId: number;
  isOpenModal: boolean;
  onOpenModal: (val: boolean) => void;
}

const PizzaCard: React.FC<PizzaCardProps> = ({
  imgSrc,
  title,
  price,
  pizzaId,
  onOpenModal,
}) => {
  const addToCart = useStore((s) => s.addToCart);

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

      <Card.Footer p={4} display="flex" alignItems="center" textAlign="center">
        <Button
          onClick={() => onOpenModal(true)}
          size="sm"
          variant="outline"
          colorScheme="orange"
          css={{
            borderRadius: "md",
            fontSize: "xs",
            fontWeight: "medium",
            border: "1px solid",
            borderColor: "orange.300",
            backgroundColor: "orange.50",
            _hover: {
              backgroundColor: "orange.100",
              borderColor: "orange.400",
            },
          }}
        >
          Доп
        </Button>

        <Button
          variant="solid"
          p={2}
          bg="rgb(248, 150, 76)"
          //   color={color}
          _hover={{ bg: "rgb(230,130,50)" }}
          onClick={() => addToCart(pizzaId)}
        >
          Добавить в корзину
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};

export default PizzaCard;
