import { Box, Text } from "@chakra-ui/react";

interface InfoItemProps {
  title: string;
  value: string;
}

const InfoItem = ({ title, value }: InfoItemProps) => {
  return (
    <Box>
      <Text fontWeight="bold" color="gray.600" mb={1}>
        {title}:
      </Text>
      <Text fontSize="lg">{value}</Text>
    </Box>
  );
};

export default InfoItem;
