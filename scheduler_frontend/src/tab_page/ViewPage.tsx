import React, { useEffect, useState } from "react";
import { TaskView } from "../component/TaskView";
import { useLoadTaskData } from "../serverRequest";
import { TaskUpdater } from "../component/TaskUpdater";
import { List, ListItem } from "@chakra-ui/react";
import { clrTaskViewItemShadow } from "../constants";
import { selectTaskData } from "../redux/taskDataState";
import { useAppSelector } from "../redux";

export const ViewPage = () => {
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
              m="1rem"
              boxShadow={`2px 2px 8px 0 ${clrTaskViewItemShadow}`}
              className="taskViewItem"
            >
              {updateTaskName === val.name ? (
                <TaskUpdater
                  name={val.name}
                  date={val.date}
                  description={val.description}
                  setUpdateTaskName={setUpdateTaskName}
                />
              ) : (
                <TaskView
                  name={val.name}
                  date={val.date}
                  description={val.description}
                  setUpdateTaskName={setUpdateTaskName}
                ></TaskView>
              )}
            </ListItem>
          );
        })}
      </List>
    </>
  );
};
