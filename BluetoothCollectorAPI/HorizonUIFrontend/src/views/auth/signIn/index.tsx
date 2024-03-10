import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useAppSelector } from "store/selectors";
import { AuthActionType, UserActionType } from "store/enums";
import { useHistory } from "react-router-dom";

function SignIn() {
  const dispatch = useDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const brandStars = useColorModeValue("brand.500", "brand.400");

  const history = useHistory();

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => setShow(!show);

  const handleEmailChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPassword(e.target.value);
  };

  const handleLoginSubmit = () => {
    console.log("Email:", email);
    console.log("Password:", password);
    dispatch({
      type: AuthActionType.LOGIN_REQUEST,
      payload: {
        email: email,
        password: password,
        redirect: (): void => history.push("/admin/default"),
      },
    });
  };

  // todo useForms or someting else to validate

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      mt="14vh"
    >
      <Box>
        <Heading color={textColor} fontSize="36px" mb="10px">
          Sign In
        </Heading>
        <Text
          mb="36px"
          ms="4px"
          color={textColorSecondary}
          fontWeight="400"
          fontSize="md"
        >
          Enter your email and password to sign in!
        </Text>
      </Box>

      <Flex
        direction="column"
        w={{ base: "100%", md: "420px" }}
        maxW="100%"
        background="transparent"
        borderRadius="15px"
        mt="20px"
      >
        <FormControl>
          <FormLabel
            fontSize="sm"
            fontWeight="500"
            color={textColor}
            display="flex"
          >
            Email<Text color={brandStars}>*</Text>
          </FormLabel>
          <Input
            isRequired={true}
            variant="auth"
            fontSize="sm"
            type="email"
            placeholder="test@test.com"
            mb="24px"
            fontWeight="500"
            size="lg"
            value={email}
            onChange={handleEmailChange}
          />

          <FormLabel
            fontSize="sm"
            fontWeight="500"
            color={textColor}
            display="flex"
          >
            Password<Text color={brandStars}>*</Text>
          </FormLabel>
          <InputGroup size="md">
            <Input
              isRequired={true}
              fontSize="sm"
              placeholder="Min. 8 characters"
              mb="24px"
              size="lg"
              type={show ? "text" : "password"}
              variant="auth"
              value={password}
              onChange={handlePasswordChange}
            />
            <InputRightElement display="flex" alignItems="center" mt="4px">
              <Icon
                color="gray.400"
                _hover={{ cursor: "pointer" }}
                as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                onClick={handleClick}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button
          fontSize="sm"
          variant="brand"
          fontWeight="500"
          onClick={handleLoginSubmit}
          w="100%"
          h="50"
          mb="24px"
        >
          Sign In
        </Button>
      </Flex>
    </Flex>
  );
}

export default SignIn;
