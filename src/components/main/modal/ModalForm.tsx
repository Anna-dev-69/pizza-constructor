import { useEffect, useState } from "react";
import { Button, Checkbox, Dialog, Portal, Stack } from "@chakra-ui/react";
import { useStore } from "../../../store/store";
import { IIngredients } from "../../../store/interfaces";

interface ModalWithCheckboxesProps {
  isOpenModal: boolean;
  onOpenModal: (val: boolean) => void;
  ingredients: IIngredients[];
  pizzaId: number;
}

function ModalWithCheckboxes({
  isOpenModal,
  onOpenModal,
  ingredients,
  pizzaId,
}: ModalWithCheckboxesProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const selectedPizza = useStore((s) => s.selectedPizza);

  const handleCheckboxChange = (value: string, checked: boolean | string) => {
    const isChecked = checked === true || checked === "true";

    const ingredient = ingredients.find(
      (ingredient) => ingredient.id === value
    );

    if (ingredient) {
      if (isChecked) {
        useStore.getState().addIngredient(ingredient);
      } else {
        useStore.setState((state) => ({
          selectedIngredients: state.selectedIngredients.filter(
            (ing) => ing.id !== ingredient.id
          ),
        }));
      }
    }

    setSelectedItems((prev) =>
      isChecked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleAddIngredients = () => {
    if (!selectedPizza) return;

    const selectedIngredients = ingredients.filter((ingredient) =>
      selectedItems.includes(ingredient.id)
    );

    useStore
      .getState()
      .updatePizzaSelectedIngredients(pizzaId, selectedIngredients);
    onOpenModal(false);

    useStore.getState().addToCart(pizzaId);
  };

  return (
    <>
      <Dialog.Root open={isOpenModal} onOpenChange={(e) => onOpenModal(e.open)}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner
            direction="row"
            minH="100vh"
            p="20px"
            alignItems="center"
          >
            <Dialog.Content w="400px" p="20px">
              <Dialog.Header>
                <Dialog.Title mb={4}>
                  Выберите дополнительные ингредиенты
                </Dialog.Title>
              </Dialog.Header>

              <Dialog.Body>
                <Stack gap="2">
                  {ingredients &&
                    ingredients.map((option) => (
                      <Checkbox.Root
                        colorPalette="green"
                        key={option.id}
                        value={option.id}
                        checked={selectedItems.includes(option.id)}
                        onCheckedChange={(details) =>
                          handleCheckboxChange(option.id, details.checked)
                        }
                      >
                        <Checkbox.HiddenInput />
                        <Checkbox.Control />
                        <Checkbox.Label>
                          {option.name}- {option.price}руб
                        </Checkbox.Label>
                      </Checkbox.Root>
                    ))}
                </Stack>
              </Dialog.Body>

              <Dialog.Footer gap="3">
                <Button
                  p={2}
                  variant="outline"
                  onClick={() => onOpenModal(false)}
                >
                  Отмена
                </Button>
                <Button
                  p={2}
                  onClick={handleAddIngredients}
                  disabled={selectedItems.length === 0}
                  bg="rgb(82, 167, 114)"
                  transition="background-color 300ms"
                  _hover={{ bg: "rgba(82, 167, 115, 0.75)" }}
                >
                  Добавить
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
}

export default ModalWithCheckboxes;
