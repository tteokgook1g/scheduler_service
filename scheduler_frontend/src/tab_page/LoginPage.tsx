import { Flex, Center } from "@chakra-ui/react";
import { LoginForm } from "../component/LoginForm";
import { SecureWarning } from "../component/SecureWarning";

export const LoginPage = () => {
  return (
    <Center w="100vw" h="100vh">
      <Flex
        w="40%"
        h="max-content"
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <LoginForm />
        <SecureWarning />
      </Flex>
    </Center>
  );
};
