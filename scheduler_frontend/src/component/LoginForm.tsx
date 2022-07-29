import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  useToast,
} from "@chakra-ui/react";
import { defaultLoginData } from "../types";
import {
  bgTaskView,
  clrTaskViewItemShadow,
  NAMESPACE_AUTH,
  SERVER_URL,
} from "../constants";
import { usePostLogin } from "../serverRequest";

export const LoginForm = () => {
  const [formData, setFormData] = useState(defaultLoginData);
  const postLogin = usePostLogin();
  const makeToast = useToast();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormData(defaultLoginData); // 초기화
    postLogin(formData);
  };

  return (
    <Box
      bgColor={bgTaskView}
      boxShadow={`0 0 16px 0 ${clrTaskViewItemShadow}`}
      w="100%"
    >
      <form
        method="post"
        action={`${SERVER_URL}/${NAMESPACE_AUTH}/login`}
        onSubmit={onSubmit}
      >
        <FormControl p="1rem">
          <FormLabel>id</FormLabel>
          <Input
            type="text"
            name="id"
            value={formData.id}
            onChange={onInputChange}
          />
        </FormControl>
        <FormControl p="1rem">
          <FormLabel>password</FormLabel>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={onInputChange}
          />
        </FormControl>
        <Button type="submit" m="1rem" w="calc(100% - 2rem)">
          Login
        </Button>
      </form>
    </Box>
  );
};
