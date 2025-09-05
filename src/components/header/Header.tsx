import { Flex, Heading, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Flex
      as="header"
      justify="space-between"
      align="center"
      p={4}
      boxShadow="sm"
      maxW="1200px"
      mx="auto"
    >
      <Heading size={"xl"}>Pizza Constructor</Heading>

      <HStack spaceX={8}>
        <Link to="/">Home</Link>
        <Link to="/basket">Basket</Link>
      </HStack>
    </Flex>
  );
};

export default Header;
