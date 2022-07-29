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
      <Box bgColor={bgTaskView}>
        <Flex
          minH={"4rem"}
          align="center"
          w="100%"
          justifyContent="space-between"
        >
          <Flex>
            <FormControl>
              <Input
                marginEnd={"2rem"}
                marginStart={"1rem"}
                fontSize="larger"
                fontWeight="700"
                placeholder={name}
                value={formData.name}
                type="text"
                onChange={onInputChange}
                name="name"
              ></Input>
            </FormControl>
            <Input
              marginEnd={"2rem"}
              type="datetime-local"
              value={dateToDateTimeLocal(formData.date)}
              onChange={onInputChange}
              name="date"
            ></Input>
          </Flex>
        </Flex>

        <Box>
          <Text marginStart={"1rem"} marginEnd={"1rem"}>
            설명:{" "}
            <Textarea
              value={formData.description}
              onChange={onTextAreaChange}
              name="description"
            />
          </Text>
          <Box>
            <Button
              colorScheme={"blue"}
              variant="solid"
              m={"1rem"}
              type="submit"
            >
              확인
            </Button>
            <Button
              variant="solid"
              m={"1rem"}
              onClick={() => {
                setUpdateTaskName(null);
              }}
            >
              취소
            </Button>
          </Box>
        </Box>
      </Box>
    </form>
  );
};
