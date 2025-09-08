import { Box, Container, Flex } from "@chakra-ui/react";
import PizzaList from "./pizza-list/PizzaList";
import { useState } from "react";
import { useStore } from "../../store/store";
import ModalWithCheckboxes from "./modal/ModalForm";

const Main = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const selectedPizza = useStore((s) => s.selectedPizza);

  return (
    <Container maxW="container.xl">
      <Flex gap={6}>
        <Box flex={3}>
          <PizzaList isOpenModal={isOpenModal} onOpenModal={setIsOpenModal} />
        </Box>
      </Flex>

      {selectedPizza && (
        <ModalWithCheckboxes
          pizzaId={selectedPizza?.id}
          isOpenModal={isOpenModal}
          onOpenModal={setIsOpenModal}
          ingredients={selectedPizza?.ingredients || []}
        />
      )}
    </Container>
  );
};

export default Main;
