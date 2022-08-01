import { ViewTab } from "../component/ViewPage";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Center,
  Box,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
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
          <Box w={"min(1080px, 100%)"}>
            <Tabs w={"100%"}>
              <TabList>
                <Tab>View</Tab>
                <Tab>Create</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <ViewTab />
                </TabPanel>
                <TabPanel>
                  <TaskCreator />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Center>
      ) : (
        <Center w="100%" h="100%" mt="3rem">
          <Alert
            status="error"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            p="1rem"
            w="min(70%, 25rem)"
          >
            <AlertIcon boxSize="3rem" />
            <AlertTitle mt="1rem" mr="0">
              로그인 후 이용하세요
            </AlertTitle>
          </Alert>
        </Center>
      )}
    </>
  );
};
