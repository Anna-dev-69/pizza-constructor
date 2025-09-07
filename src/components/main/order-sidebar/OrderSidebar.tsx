import { Container } from "@chakra-ui/react";
import FullCard from "../full-card/FullCard";
import { useStore } from "../../../store/store";
import { useEffect } from "react";
import { IPizza } from "../../../store/interfaces";

const OrderSidebar = () => {
  const selectedPizza = useStore((s) => s.selectedPizza);
  const selectedIngredients = useStore((s) => s.selectedIngredients);

  useEffect(() => {
    if (!selectedPizza || selectedPizza.id === undefined) return;

    let priceSelectedIngredients = selectedIngredients.reduce(
      (acc, item) => acc + (item.price || 0),
      0
    );

    let totalSum = (selectedPizza.price || 0) + priceSelectedIngredients;

    const updatedPizza: IPizza = {
      ...selectedPizza,
      totalAmount: totalSum,
    };

    useStore.setState((state) => ({
      selectedPizza: updatedPizza,
      totalAmount: totalSum,
      pizzas: state.pizzas.map((pizza) =>
        pizza.id === selectedPizza.id ? updatedPizza : pizza
      ),
    }));
  }, [selectedPizza?.price, selectedIngredients, selectedPizza?.id]);

  return (
    <Container p={4} mt={4}>
      {selectedPizza && (
        <FullCard
          imgSrc={selectedPizza?.image}
          price={selectedPizza?.price}
          title={selectedPizza?.name}
          ingredients={selectedIngredients}
          totalAmount={selectedPizza.totalAmount}
          id={selectedPizza.id}
        />
      )}
    </Container>
  );
};

export default OrderSidebar;
