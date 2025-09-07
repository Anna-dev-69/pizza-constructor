import Header from "../components/header/Header";
import BasketAdd from "../components/main/basket-add/BasketAdd";
import { useStore } from "../store/store";
import { Box, Button, Container, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Basket = () => {
  const basket = useStore((s) => s.basket);

  return (
    <Container maxW="1200px" mx="auto" p={4}>
      <Header />
      <Flex w="1200px" flexDirection="row">
        <BasketAdd basket={basket} />
      </Flex>
      <Box display="flex" gap={2}>
        <Button
          variant="solid"
          p={2}
          border="1px solid rgb(248, 150, 76)"
          bg="rgb(255, 255, 255)"
          color="rgb(248, 150, 76)"
          _hover={{ bg: "rgba(245, 203, 169, 0.21)" }}
        >
          <Link to="/">Выбрать еще пиццу</Link>
        </Button>
        <Button
          variant="solid"
          p={2}
          bg="rgb(248, 150, 76)"
          _hover={{ bg: "rgb(230,130,50)" }}
          disabled={basket.length === 0}
        >
          <Link to="/order">Оформить заказ</Link>
        </Button>
      </Box>
    </Container>
  );
};

export default Basket;
