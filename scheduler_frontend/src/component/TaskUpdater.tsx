import React, { useState } from "react";
import { typeTaskData } from "../types";
import {
  Button,
  Box,
  Flex,
  Text,
  Input,
  Textarea,
  FormControl,
  useToast,
} from "@chakra-ui/react";

import { dateToDateTimeLocal } from "../utils";
import { bgTaskView } from "../constants";
import {
  useDeleteTaskData,
  usePatchTaskData,
  usePutTaskData,
} from "../serverRequest";

interface TaskUpdaterProps extends typeTaskData {
  setUpdateTaskName: React.Dispatch<React.SetStateAction<string | null>>;
}

export const TaskUpdater: React.FC<TaskUpdaterProps> = ({
  name,
  date,
  description,
  setUpdateTaskName,
}) => {
  const [formData, setFormData] = useState({
    name: name,
    date: date,
    description: description,
  });
  const putTaskData = usePutTaskData();
  const patchTaskData = usePatchTaskData();
  const deleteTaskData = useDeleteTaskData();
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
    setUpdateTaskName(null);
    var res: Response;
    if (formData.name === name) {
      res = await patchTaskData(formData);
    } else {
      res = await putTaskData(formData);
      if (res.status === 201) {
        res = await deleteTaskData({ name: name });
      }
    }

    if (res.status === 200) {
      makeToast({
        position: "top",
        title: "Successfully Updated",
        status: "success",
        duration: 1500,
        isClosable: true,
      });
    } else {
      makeToast({
        position: "top",
        title: "Fail to Update",
        description: `response code: ${res.status}`,
        status: "error",
        duration: 1500,
        isClosable: true,
      });
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Flex w="100%" flexDir="column" p="1.5rem">
        <Input
          className="font-bigger"
          fontWeight="700"
          placeholder={name}
          value={formData.name}
          type="text"
          onChange={onInputChange}
          name="name"
          mb="1rem"
        ></Input>

        <Input
          type="datetime-local"
          value={dateToDateTimeLocal(formData.date)}
          onChange={onInputChange}
          name="date"
          mb="1rem"
        ></Input>

        <Textarea
          value={formData.description}
          onChange={onTextAreaChange}
          name="description"
          placeholder="설명을 입력하세요"
          mb="1rem"
        />
        <Box mt="0.5rem">
          <Button colorScheme={"blue"} variant="solid" type="submit" mr="1rem">
            확인
          </Button>
          <Button
            variant="solid"
            onClick={() => {
              setUpdateTaskName(null);
            }}
            mr="1rem"
          >
            취소
          </Button>
        </Box>
      </Flex>
    </form>
  );
};
