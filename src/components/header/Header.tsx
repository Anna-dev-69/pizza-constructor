import { Flex, Heading, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const links = [
  {
    id: "1",
    title: "Home",
    href: "/",
  },
  { id: "2", title: "Basket", href: "/basket" },
];

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
        {links.map((link) => (
          <Link
            key={link.id}
            to={link.href}
            style={{
              color: "#333",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#f08a3c")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#333")}
          >
            {link.title}
          </Link>
        ))}
      </HStack>
    </Flex>
  );
};

export default Header;
