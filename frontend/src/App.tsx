import { useState } from "react";
import {
  Box,
  Text,
  Flex,
  SimpleGrid,
  Center,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    hospital: "",
    country: "",
    notes: "",
  });
  const [response, setResponse] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/api/patient/create', formData);
      setResponse(res.data.result);
      toast({
        title: "Success",
        position: "top-right",
        description: "Patient created successfully!",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
      setFormData({
        fullName: "",
        gender: "",
        hospital: "",
        country: "",
        notes: "",
      })
    } catch (error) {
      toast({
        title: "Error",
        position: "top-right",
        description: "Something went wrong!",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    setIsLoading(false);
  };

  return (
    <Center h="100vh">
      <Flex>
        <Box
          borderWidth="1px"
          borderRadius="lg"
          p={8}
          boxShadow="md"
          bg="white"
          flex={0.6}
          m={4}
        >
          <Heading mb={6}>Patient Information Form</Heading>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="center" width="100%">
              <SimpleGrid columns={2} spacing={6} width="100%">
                <FormControl id="fullName" isRequired>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="gender" isRequired>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="nonbinary">Non-binary</option>
                  </Select>
                </FormControl>
                <FormControl id="hospital" isRequired>
                  <FormLabel>Hospital</FormLabel>
                  <Input
                    type="text"
                    name="hospital"
                    value={formData.hospital}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="country" isRequired>
                  <FormLabel>Country</FormLabel>
                  <Input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  />
                </FormControl>
              </SimpleGrid>
              <FormControl id="notes">
                <FormLabel>Notes</FormLabel>
                <Textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                />
              </FormControl>
              <Button type="submit" colorScheme="blue" width={"100%"} isLoading={isLoading}>
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
        <Box
          borderWidth="1px"
          borderRadius="lg"
          p={8}
          boxShadow="md"
          bg="white"
          flex={0.4}
          m={4}
        >
          <Heading mb={6}>Information</Heading>
          <hr />
          {
            response && (
              <>
                <InfoCard
                  key="fullName"
                  title="Full Name"
                  value={response.fullName}
                />
                <InfoCard key="Gender" title="Gender" value={response.gender} />
                <InfoCard key="Hospital" title="Hospital" value={response.hospital} />
                <InfoCard key="Country" title="Country" value={response.country} />
                <InfoCard key="Notes" title="Notes" value={response.notes} />
                <InfoCard key="balnce" title="Balance" value={response.balance} />
                <InfoCard key="txnid" title="Transaction Id" value={response.transaction} />
              </>
            )
          }

        </Box>
      </Flex>
    </Center>
  );
}
const InfoCard = (props: any) => {
  return (
    <VStack spacing={1} align="flex-start" justifyContent={"flex-start"} my={2}>
      <Text as={"b"}>{props.title}</Text>
      <Text>{props.value}</Text>
    </VStack>
  );
};

export default App;
