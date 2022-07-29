import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import React from "react";

export const SecureWarning: React.FC = () => {
  return (
    <Alert
      status="error"
      m="1rem"
      w="100%"
      flexDirection="column"
      alignItems="center"
    >
      <AlertIcon boxSize="2rem" />
      <AlertTitle mt="0.4rem" mb="0.2rem">
        개인정보를 입력하지 마십시오
      </AlertTitle>
      <AlertDescription>
        이 서비스는 개발 버전입니다. 보안연결(HTTPS)가 적용되지 않으므로 정보
        유출의 위험이 있습니다
      </AlertDescription>
    </Alert>
  );
};
