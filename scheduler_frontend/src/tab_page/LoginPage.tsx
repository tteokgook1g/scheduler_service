import { Flex, Center } from "@chakra-ui/react";
import { LoginForm } from "../component/LoginForm";
import { SecureWarning } from "../component/SecureWarning";

export const LoginPage = () => {
  return (
    <Center w="100vw" h="100vh" pos="absolute" top="0" left="0">
      <Flex
        w="min(48rem, 90%)"
        m="1.5rem"
        direction="column"
        justifyContent="center"
        alignItems="center"
        gap="1rem"
      >
        <LoginForm />
        <SecureWarning />
      </Flex>
    </Center>
  );
};
