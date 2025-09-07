import { IIngredients } from "@/store/interfaces";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";

interface IngredientsListProps {
  ingredients: IIngredients[];
}

const IngredientsList = ({ ingredients }: IngredientsListProps) => {
  return (
    <Box px={4} pb={4} pt={2} borderTop="1px solid" borderTopColor="gray.100">
      <Text
        fontSize="sm"
        fontWeight="medium"
        color="gray.700"
        mb={2}
        textAlign="center"
      >
        Дополнительные ингредиенты:
      </Text>

      <VStack align="stretch">
        {ingredients.map((item) => (
          <HStack
            key={item.id}
            justify="space-between"
            spaceX={2}
            fontSize="sm"
          >
            <Text color="gray.600">{item.name}</Text>
            <Text color="orange.600" fontWeight="medium">
              +{item.price} р
            </Text>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default IngredientsList;
