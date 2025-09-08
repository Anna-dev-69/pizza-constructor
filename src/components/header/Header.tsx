import colors from "../../shared/colors";
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
      <Heading size={"xl"} color={colors.dark[50]}>
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
                color: isActive ? `${colors.orange[50]}` : `${colors.dark[50]}`,
                fontWeight: 500,
                textDecoration: isActive ? "underline" : "none",
                textUnderlineOffset: "4px",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = `${colors.orange[50]}`)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = isActive
                  ? `${colors.orange[50]}`
                  : `${colors.dark[50]}`)
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
