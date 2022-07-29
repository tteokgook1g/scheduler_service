import { ViewPage } from "../tab_page/ViewPage";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Center,
  Box,
  Text,
} from "@chakra-ui/react";
import { TaskCreator } from "../component/TaskCreator";
import { useLoadTaskData } from "../serverRequest";
import { useAppSelector } from "../redux";
import { selectUserData } from "../redux/userDataState";

export const HomePage = () => {
  useLoadTaskData()();
  const user = useAppSelector(selectUserData);

  return (
    <>
      {user.isLoggedIn ? (
        <Center margin={"1rem"}>
          <Box w={"80%"}>
            <Tabs w={"100%"}>
              <TabList>
                <Tab>View</Tab>
                <Tab>Create</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <ViewPage />
                </TabPanel>
                <TabPanel>
                  <TaskCreator />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Center>
      ) : (
        <Text>로그인 후 이용하세요</Text>
      )}
    </>
  );
};
