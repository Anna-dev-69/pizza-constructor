import { Flex, Heading, HStack } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

const links = [
  {
    id: "1",
    title: "Главная",
    href: "/",
  },
  { id: "2", title: "Корзина", href: "/basket" },
];

const Header = () => {
  const location = useLocation();
  return (
    <Flex
      as="header"
      justify="space-between"
      align="center"
      p={4}
      borderBottom="1px solid rgb(229, 229, 230)"
      maxW="1200px"
      mx="auto"
      position="sticky"
      top="0"
      zIndex={10}
      bg="rgb(255, 255, 255)"
    >
      <Heading size={"xl"} color="#333">
        Конструктор пиццы
      </Heading>

      <HStack spaceX={8}>
        {links.map((link) => {
          const isActive = location.pathname === link.href;

          return (
            <Link
              key={link.id}
              to={link.href}
              style={{
                color: "#333",
                fontWeight: 500,
                textDecoration: isActive ? "underline" : "none",
                textUnderlineOffset: "4px",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#f08a3c")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = isActive ? "#f08a3c" : "#333")
              }
            >
              {link.title}
            </Link>
          );
        })}
      </HStack>
    </Flex>
  );
};

export default Header;
