import { Box, SimpleGrid } from "@chakra-ui/react";
import PizzaCard from "../pizza-card/PizzaCard";
import { useStore } from "../../../store/store";

interface ListOfPizzasProps {
  isOpenModal: boolean;
  onOpenModal: (val: boolean) => void;
}

const ListOfPizzas: React.FC<ListOfPizzasProps> = ({ onOpenModal }) => {
  const setSelectedPizza = useStore((state) => state.setSelectedPizza);
  const pizzas = useStore((s) => s.pizzas);

  return (
    <SimpleGrid columns={3} gap="20px" p={4} mt={4}>
      {pizzas.map((pizza) => (
        <Box
          key={pizza.id}
          onClick={() => {
            useStore.setState({ currentPizzaId: pizza.id });
            setSelectedPizza(pizza.id);
          }}
        >
          <PizzaCard
            onOpenModal={onOpenModal}
            key={pizza.id}
            pizzaId={pizza.id}
            // imgSrc={pizza.image}
            price={pizza.price}
            title={pizza.name}
            ingredients={pizza.ingredients}
          />
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default ListOfPizzas;
