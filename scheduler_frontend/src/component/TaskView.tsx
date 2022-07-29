import React, { useState } from "react";
import { typeTaskData } from "../types";
import {
  Button,
  Box,
  Center,
  Flex,
  Icon,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ReactComponent as ChevronIcon } from "../asset/chevron-thin-down.svg";
import { useDeleteTaskData } from "../serverRequest";

import { dateToKorean } from "../utils";
import { bgTaskView } from "../constants";

interface TaskViewProps extends typeTaskData {
  setUpdateTaskName: React.Dispatch<React.SetStateAction<string | null>>;
}

export const TaskView: React.FC<TaskViewProps> = ({
  name,
  date,
  description,
  setUpdateTaskName,
}) => {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const deleteTaskData = useDeleteTaskData();
  const makeToast = useToast();

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsShowDetail(!isShowDetail);
  };

  return (
    <Box bgColor={bgTaskView}>
      <Flex
        minH={"4rem"}
        align="center"
        onClick={onClick}
        w="100%"
        justifyContent="space-between"
      >
        <Flex>
          <Text
            marginEnd={"2rem"}
            marginStart={"1rem"}
            fontSize="larger"
            fontWeight="700"
          >
            {name}
          </Text>
          <Text marginEnd={"2rem"}>{dateToKorean(date)}</Text>
        </Flex>
        <Center marginEnd={"2rem"}>
          <Icon as={ChevronIcon} width={"1rem"} height={"1rem"} />
        </Center>
      </Flex>
      {isShowDetail && (
        <Box>
          <Text marginStart={"1rem"}>설명: {description}</Text>
          <Box>
            <Button
              colorScheme={"blue"}
              variant="solid"
              m={"1rem"}
              onClick={() => {
                setUpdateTaskName(name);
              }}
            >
              수정
            </Button>
            <Button
              colorScheme={"red"}
              variant="outline"
              m={"1rem"}
              onClick={async () => {
                const res = await deleteTaskData({ name: name });
                if (res.status === 200) {
                  makeToast({
                    position: "top",
                    title: "Successfully Deleted",
                    status: "success",
                    duration: 1500,
                    isClosable: true,
                  });
                } else {
                  makeToast({
                    position: "top",
                    title: "Fail to Delete",
                    description: `response code: ${res.status}`,
                    status: "error",
                    duration: 1500,
                    isClosable: true,
                  });
                }
              }}
            >
              삭제
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};
