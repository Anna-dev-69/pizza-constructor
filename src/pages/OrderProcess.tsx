import { useEffect, useState } from "react";
import { Button, ButtonGroup, Stack, Steps, Box } from "@chakra-ui/react";
import { useStore } from "./../store/store";
import StepsContent from "../components/main/steps-content/StepsContent";

const OrderProcess = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    phone: "",
    address: "",
    comment: "",
  });

  const basket = useStore((s) => s.basket);
  const total = useStore((s) => s.total);

  useEffect(() => {
    const savedStep = sessionStorage.getItem("currentStep");

    setCurrentStep(Number(savedStep));
  }, []);

  useEffect(() => {
    sessionStorage.setItem("currentStep", String(currentStep));
  }, [currentStep]);

  useEffect(() => {
    return () => {
      sessionStorage.removeItem("currentStep");
    };
  }, []);

  const steps = ["Корзина", "Данные", "Подтверждение"];

  return (
    <>
      <Box p={4}>
        <Steps.Root
          maxW="1200px"
          mx="auto"
          orientation="horizontal"
          step={currentStep}
          count={steps.length}
          onStepChange={(details) => setCurrentStep(details.step)}
        >
          <Steps.List>
            {steps.map((step, index) => (
              <Steps.Item
                key={index}
                index={index}
                title={step}
                colorPalette="green"
              >
                <Steps.Indicator />
                <Steps.Separator />
              </Steps.Item>
            ))}
          </Steps.List>

          <Stack mt={8} spaceX={4}>
            {steps.map((step, index) => (
              <StepsContent
                key={index}
                basket={basket}
                formData={formData}
                index={index}
                onCurrentStep={setCurrentStep}
                onFormData={setFormData}
                total={total}
              />
            ))}

            {currentStep === 0 && (
              <ButtonGroup size="md" variant="outline">
                <Steps.PrevTrigger asChild>
                  <Button p={2}>Назад</Button>
                </Steps.PrevTrigger>
                <Steps.NextTrigger asChild>
                  <Button p={2}>Далее</Button>
                </Steps.NextTrigger>
              </ButtonGroup>
            )}
          </Stack>
        </Steps.Root>
      </Box>
    </>
  );
};

export default OrderProcess;
