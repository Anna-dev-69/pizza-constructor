import { Box, SimpleGrid } from "@chakra-ui/react";
import PizzaCard from "../pizza-card/PizzaCard";
import { useStore } from "../../../store/store";

interface PizzaListProps {
  isOpenModal: boolean;
  onOpenModal: (val: boolean) => void;
}

const PizzaList: React.FC<PizzaListProps> = ({ onOpenModal }) => {
  const pizzas = useStore((s) => s.pizzas);

  return (
    <SimpleGrid
      columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
      gap={{ base: 4, md: 6 }}
      p={{ base: 2, md: 4 }}
      mt={{ base: 2, md: 4 }}
    >
      {pizzas.map((pizza) => (
        <Box
          key={pizza.id}
          onClick={() => {
            useStore.setState({ currentPizzaId: pizza.id });
            useStore.getState().setSelectedPizza(pizza.id);
          }}
        >
          <PizzaCard onOpenModal={onOpenModal} pizza={pizza} />
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default PizzaList;
