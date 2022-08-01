import React, { useEffect, useState } from "react";
import { TaskView } from "./TaskView";
import { useLoadTaskData } from "../serverRequest";
import { TaskUpdater } from "./TaskUpdater";
import { Box, List, ListItem } from "@chakra-ui/react";
import { bgTaskView, clrTaskViewItemShadow } from "../constants";
import { selectTaskData } from "../redux/taskDataState";
import { useAppSelector } from "../redux";

export const ViewTab = () => {
  const taskData = useAppSelector(selectTaskData);
  const loadTaskData = useLoadTaskData();

  const [updateTaskName, setUpdateTaskName] = useState<string | null>(null);

  useEffect(() => {
    const id = setInterval(async () => {
      await loadTaskData();
    }, 60000);
    return () => clearInterval(id);
  });

  return (
    <>
      <List className="taskViewContainer">
        {taskData?.map((val) => {
          return (
            <ListItem
              key={val.name}
              bgColor={bgTaskView}
              boxShadow={`2px 2px 8px 0 ${clrTaskViewItemShadow}`}
            >
              {updateTaskName === val.name ? (
                <Box mb="3rem" mt="3rem">
                  <TaskUpdater
                    name={val.name}
                    date={val.date}
                    description={val.description}
                    setUpdateTaskName={setUpdateTaskName}
                  />
                </Box>
              ) : (
                <Box mb="1rem" mt="1rem">
                  <TaskView
                    name={val.name}
                    date={val.date}
                    description={val.description}
                    setUpdateTaskName={setUpdateTaskName}
                  ></TaskView>
                </Box>
              )}
            </ListItem>
          );
        })}
      </List>
    </>
  );
};
