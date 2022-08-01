import React from "react";
import { Flex, Text } from "@chakra-ui/react";

import { bgHeader } from "../constants";
import { Link } from "react-router-dom";
import { useAppSelector } from "../redux";
import { selectUserData } from "../redux/userDataState";
import { useLogout } from "../serverRequest";

export const Header: React.FC = () => {
  const logout = useLogout();
  const user = useAppSelector(selectUserData);

  return (
    <Flex bgColor={bgHeader} w="100%" minH="2.5rem" align="center">
      <Link to="/">
        <Text className="font-smaller" m="1rem">
          과제관리
        </Text>
      </Link>
      {!user.isLoggedIn ? (
        <Link to="/login">
          <Text className="font-smaller" color="gray" m="1rem">
            로그인
          </Text>
        </Link>
      ) : (
        <button onClick={logout}>
          <Text className="font-smaller" color="gray" m="1rem">
            {user.id}님 로그아웃
          </Text>
        </button>
      )}
    </Flex>
  );
};
