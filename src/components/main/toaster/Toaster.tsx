import { toaster } from "../../ui/toaster";
import { Button } from "@chakra-ui/react";

const Toast = () => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => {
        const promise = new Promise<void>((resolve) => {
          setTimeout(() => resolve(), 5000);
        });

        toaster.promise(promise, {
          success: {
            title: "Заказ оформлен!",
            description: "",
          },
          error: {
            title: "Upload failed",
            description: "Something wrong with the upload",
          },
          loading: { title: "Uploading...", description: "Please wait" },
        });
      }}
    >
      Show Toast
    </Button>
  );
};

export default Toast;
