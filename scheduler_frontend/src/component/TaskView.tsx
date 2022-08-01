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
import { useMediaQuery } from "react-responsive";

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
  const isSmallDevice = useMediaQuery({ query: "(max-width : 40rem)" });

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsShowDetail(!isShowDetail);
  };

  return (
    <Flex p="1rem" flexDir="column" gap="1rem" onClick={onClick}>
      <Flex w="100%" justifyContent="space-between">
        <Flex
          flexDir={isSmallDevice ? "column" : "row"}
          gap="0.5rem"
          align="baseline"
        >
          <Text className="font-bigger" fontWeight="700">
            {name}
          </Text>
          <Text>{dateToKorean(date)}</Text>
        </Flex>
        <Center pl="0.5rem">
          <Icon as={ChevronIcon} width={"1rem"} height={"1rem"} />
        </Center>
      </Flex>

      {isShowDetail && (
        <>
          <Text>설명: {description}</Text>
          <Flex gap="1rem">
            <Button
              colorScheme={"blue"}
              variant="solid"
              onClick={() => {
                setUpdateTaskName(name);
              }}
            >
              수정
            </Button>
            <Button
              colorScheme={"red"}
              variant="outline"
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
          </Flex>
        </>
      )}
    </Flex>
  );
};
