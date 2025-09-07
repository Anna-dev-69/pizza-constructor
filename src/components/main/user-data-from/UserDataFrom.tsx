import { Button, Field, Input, Stack, Textarea } from "@chakra-ui/react";
import { useForm, UseFormSetValue } from "react-hook-form";

export interface FormValues {
  firstName: string;
  phone: string;
  address: string;
  comment: string;
}

interface UserDataFromProps {
  onFormData: (val: FormValues) => void;
  onCurrentStep: (val: number) => void;
}

const UserDataFrom = ({
  onFormData: setFormData,
  onCurrentStep,
}: UserDataFromProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit((data) => {
    setFormData(data);
    onCurrentStep(2);
  });

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="4" align="flex-start" maxW="sm">
        <Field.Root invalid={!!errors.firstName}>
          <Field.Label>Имя</Field.Label>
          <Input
            pl={2}
            {...register("firstName", {
              required: "Имя обязательно",
            })}
            placeholder="Введите имя"
          />
          <Field.ErrorText>{errors.firstName?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.phone}>
          <Field.Label>Телефон</Field.Label>
          <Input
            pl={2}
            {...register("phone", {
              required: "Телефон обязателен",
              pattern: {
                value: /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/,
                message: "Введите корректный номер телефона",
              },
              onChange: (e) => {
                let val = e.target.value.replace(/\D/g, "");
                if (val.startsWith("8")) val = "7" + val.slice(1);
                if (!val.startsWith("7")) val = "7" + val;

                let formatted = "+7 ";
                if (val.length > 1) formatted += "(" + val.slice(1, 4);
                if (val.length >= 4) formatted += ") " + val.slice(4, 7);
                if (val.length >= 7) formatted += "-" + val.slice(7, 9);
                if (val.length >= 9) formatted += "-" + val.slice(9, 11);

                e.target.value = formatted;
              },
            })}
            placeholder="+7 (XXX) XXX-XX-XX"
            type="tel"
          />
          <Field.ErrorText>{errors.phone?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.address}>
          <Field.Label>Адрес доставки</Field.Label>
          <Input
            pl={2}
            {...register("address", {
              required: "Адрес обязателен",
              minLength: {
                value: 5,
                message: "Введите полный адрес",
              },
            })}
            placeholder="Город, улица, дом, квартира"
          />
          <Field.ErrorText>{errors.address?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.comment}>
          <Field.Label>Комментарий к заказу</Field.Label>
          <Textarea
            pl={2}
            {...register("comment")}
            placeholder="Дополнительная информация для курьера"
            rows={3}
          />
          <Field.ErrorText>{errors.comment?.message}</Field.ErrorText>
        </Field.Root>

        <Button
          type="submit"
          p={2}
          bg="rgb(82, 167, 114)"
          transition="background-color 300ms"
          _hover={{ bg: "rgba(82, 167, 115, 0.75)" }}
        >
          Отправить
        </Button>
      </Stack>
    </form>
  );
};

export default UserDataFrom;
