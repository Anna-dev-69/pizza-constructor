import colors from "../shared/colors";
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
          bg={colors.white[50]}
          color={colors.orange[100]}
          _hover={{ bg: colors.dark[100] }}
        >
          <Link to="/">Выбрать еще пиццу</Link>
        </Button>
        <Button
          variant="solid"
          p={2}
          bg={colors.orange[100]}
          _hover={{ bg: colors.orange[200] }}
          disabled={basket.length === 0}
        >
          <Link to="/order">Оформить заказ</Link>
        </Button>
      </Box>
    </Container>
  );
};

export default Basket;
