import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { defaultTaskData } from "../types";
import { usePutTaskData } from "../serverRequest";
import { dateToDateTimeLocal } from "../utils";

export const TaskCreator = () => {
  const [formData, setFormData] = useState(defaultTaskData);
  const putTaskData = usePutTaskData();
  const makeToast = useToast();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "date") {
      setFormData({
        ...formData,
        [name]: new Date(value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const onTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await putTaskData(formData);
    setFormData(defaultTaskData); // 초기화
    if (res.status === 201) {
      makeToast({
        position: "top",
        title: "Successfully Created",
        status: "success",
        duration: 1500,
        isClosable: true,
      });
    } else {
      makeToast({
        position: "top",
        title: "Fail to Create",
        description:`response code: ${res.status}`,
        status: "error",
        duration: 1500,
        isClosable: true,
      });
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <FormControl>
        <FormLabel>과제명</FormLabel>
        <Input
          type="text"
          name="name"
          placeholder="과제명을 입력하세요"
          value={formData.name}
          onChange={onInputChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>일시</FormLabel>
        <Input
          type="datetime-local"
          name="date"
          value={dateToDateTimeLocal(formData.date)}
          onChange={onInputChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>설명</FormLabel>
        <Textarea
          name="description"
          placeholder="과제에 대한 설명을 입력하세요"
          value={formData.description}
          onChange={onTextAreaChange}
        />
      </FormControl>
      <Button type="submit">생성</Button>
    </form>
  );
};
