import React, { useState } from 'react';
import {
  Heading,
  HStack,
  Box,
  Flex,
  FormLabel,
  Image,
  FormControl,
  FormHelperText,
  Stack,
  Button,
  useToast,
  Text,
  Input,
} from '@chakra-ui/react';
import chip from '../icons/chip.svg';
import visa from '../icons/Visa.svg';
import { paymentInfoAction } from '../../utils/Actions';
import { useHistory } from 'react-router-dom';

const Payments = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [contactDetailsForm, setContactdetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    CVV: '',
    accountName: '',
    accountNumber: '',
    bankName: '',
  });
  const toast = useToast();
  const handleInput = (e) => {
    const { name, value } = e.target;
    setContactdetails((inputDetails) => {
      return { ...inputDetails, [name]: value };
    });
  };
  const reformDate = (date) => {
    let confam = date.replace('-', '');
    let month = confam.substr(4, 2);
    let year = confam.substr(0, 4);
    let final = month + '/' + year;
    return final;
  };

  const submitForm = () => {
    setLoading(true);
    paymentInfoAction(contactDetailsForm)
      .then((response) => {
        if (response.message === 'success') {
          history.push('/');
        } else {
          toast({
            title: 'Error',
            position: 'top',
            description: response.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
        console.log(response);
        setLoading(false);
      })
      .catch((err) => {
        // setError(err);
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <Stack p={[2, 4, 6]} spacing="30px" h="1000px">
      <Heading fontSize="2xl">Payment Details</Heading>
      <FormControl px={[0, 2]} w="full">
        <Stack spacing="30px" px={{ base: '3%', md: '40px' }}>
          <Text fontSize="xl">Card</Text>
          <Stack
            w="350px"
            h="210px"
            rounded="lg"
            display={['none', 'block']}
            bgGradient="linear(to-bl,brand.400,brand.200)"
            color="silver"
            mb={3}
          >
            <Flex justify="space-between">
              <Image src={visa} pl={['2', '5']} pt="2"></Image>
              <Text pr={['2', '8']} pt="3">
                PayStack Card
              </Text>
            </Flex>
            <Image src={chip} pl={['2', '8']}></Image>
            <Flex p="3" color="white" justify="space-evenly">
              <Heading fontSize="2xl">
                {contactDetailsForm.cardNumber.substr(0, 4)}
              </Heading>
              <Heading fontSize="2xl">****</Heading>
              <Heading fontSize="2xl">****</Heading>
              <Heading fontSize="2xl">
                {contactDetailsForm.cardNumber.substr(12, 16)}
              </Heading>
            </Flex>
            <Flex justify="space-between" color="white" px={['2', '8']} pt={2}>
              <Box>
                <Text fontSize="9px">Card Holder's Name</Text>
                <Text isTruncated maxW="160px">
                  {contactDetailsForm.cardHolder}
                </Text>
              </Box>
              <Box>
                <Text fontSize="9px">Expiry Date</Text>
                <Text>{reformDate(contactDetailsForm.expiryDate)}</Text>
              </Box>
              <Box>
                <Text fontSize="9px">CVV</Text>
                <Text>{contactDetailsForm.CVV}</Text>
              </Box>
            </Flex>
          </Stack>
          <Stack
            direction={['column', 'column', 'row']}
            spacing={['', '5px', '60px']}
          >
            <Box pt={3} maxW="sm">
              <FormLabel color="#8F90A6" fontSize="sm">
                Card Number
              </FormLabel>
              <Input
                borderRadius="md"
                type="number"
                w={['full', 'sm']}
                placeholder="Card Number"
                name="cardNumber"
                value={contactDetailsForm.cardNumber}
                onChange={handleInput}
              />
              <FormHelperText color="gray" fontSize="14px">
                No spaces or special characters i.e * , / , -
              </FormHelperText>
            </Box>
            <Box pt={3}>
              <FormLabel color="#8F90A6" fontSize="sm">
                Card Holder's Name
              </FormLabel>
              <Input
                borderRadius="md"
                type="text"
                w={['full', 'sm']}
                placeholder="Card Holder's Name"
                name="cardHolder"
                value={contactDetailsForm.cardHolder}
                onChange={handleInput}
              />
            </Box>
          </Stack>
          <Stack
            direction={['column', 'column', 'row']}
            spacing={['', '5px', '60px']}
            pb={2}
          >
            <Box pt={3} maxW="sm">
              <FormLabel color="#8F90A6" fontSize="sm">
                CVV
              </FormLabel>
              <Input
                borderRadius="md"
                type="number"
                max={999}
                w={['full', 'sm']}
                placeholder="CVV"
                name="CVV"
                value={contactDetailsForm.CVV}
                onChange={handleInput}
              />
            </Box>
            <Box pt={3}>
              <FormLabel color="#8F90A6" fontSize="sm">
                Card Expiry Date
              </FormLabel>
              <Input
                borderRadius="md"
                type="month"
                min="2021-10"
                w={['full', 'sm']}
                placeholder="Expiry Date"
                name="expiryDate"
                value={contactDetailsForm.expiryDate}
                onChange={handleInput}
              />
            </Box>
          </Stack>
          <Text fontSize="xl" pt={4}>
            Bank
          </Text>{' '}
          <Stack
            direction={['column', 'column', 'row']}
            spacing={['', '5px', '60px']}
          >
            <Box pt={3} maxW="sm">
              <FormLabel color="#8F90A6" fontSize="sm">
                Account Name
              </FormLabel>
              <Input
                borderRadius="md"
                type="text"
                w={['full', 'sm']}
                placeholder="Account Name"
                name="accountName"
                value={contactDetailsForm.accountName}
                onChange={handleInput}
              />
            </Box>
            <Box pt={3}>
              <FormLabel color="#8F90A6" fontSize="sm">
                Account Number
              </FormLabel>
              <Input
                borderRadius="md"
                type="text"
                w={['full', 'sm']}
                placeholder="Account Number"
                name="accountNumber"
                value={contactDetailsForm.accountNumber}
                onChange={handleInput}
              />
            </Box>
          </Stack>
          <Stack
            direction={['column', 'column', 'row']}
            spacing={['', '5px', '60px']}
          >
            <Box maxW="sm">
              <FormLabel color="#8F90A6" fontSize="sm">
                Name of Bank
              </FormLabel>
              <Input
                borderRadius="md"
                type="text"
                w={['full', 'sm']}
                placeholder="Name of bank"
                name="bankName"
                value={contactDetailsForm.bankName}
                onChange={handleInput}
              />
            </Box>
          </Stack>
          <HStack align="center" mt={8} mb={[60, 28, 0]}>
            <Button
              w={['full', '30%']}
              padding="14px 32px"
              color="whiteAlpha.900"
              isLoading={loading}
              _hover={{
                bgColor: '#0E6BA8',
              }}
              bgColor="brand.300"
              onClick={submitForm}
            >
              Save
            </Button>
          </HStack>
        </Stack>
      </FormControl>
    </Stack>
  );
};

export default Payments;
