import { Button, Checkbox, CheckboxGroup, Fieldset } from "@chakra-ui/react";
import { IIngredients } from "../pizza-card/PizzaCard";
import { useStore } from "../../../store/store";

import { zodResolver } from "@hookform/resolvers/zod";
import { useController, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  framework: z.array(z.string()).min(1, {
    message: "You must select at least one framework.",
  }),
});

type FormData = z.infer<typeof formSchema>;

interface AdditionalIngredientsProps {
  ingredients: IIngredients[];
}

const AdditionalIngredients: React.FC<AdditionalIngredientsProps> = ({
  ingredients,
}) => {
  const { selectedIngredients, setSelectedIngredients } = useStore();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const framework = useController({
    control,
    name: "framework",

    defaultValue: [],
  });

  const invalid = !!errors.framework;

  const totalSum = framework.field.value.reduce(
    (acc, item) => acc + Number(item),
    0
  );
  console.log("totalSum", totalSum);

  return (
    <form
      onSubmit={handleSubmit((data: any) => {
        console.log(data);
      })}
    >
      <Fieldset.Root invalid={invalid}>
        <CheckboxGroup
          invalid={invalid}
          value={framework.field.value}
          onValueChange={framework.field.onChange}
          name={framework.field.name}
        >
          <Fieldset.Content>
            {ingredients.map((item) => (
              <Checkbox.Root key={item.id} value={item.price.toString()}>
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label>
                  {item.name} - {item.price}руб
                </Checkbox.Label>
              </Checkbox.Root>
            ))}
          </Fieldset.Content>
        </CheckboxGroup>

        {errors.framework && (
          <Fieldset.ErrorText>{errors.framework.message}</Fieldset.ErrorText>
        )}

        <Button size="sm" type="submit" alignSelf="flex-end">
          Добавить
        </Button>

        <Fieldset.Legend>Общая сумма: {totalSum}руб</Fieldset.Legend>
      </Fieldset.Root>
    </form>
  );
};

export default AdditionalIngredients;
