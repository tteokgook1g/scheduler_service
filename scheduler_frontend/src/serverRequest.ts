import { SERVER_URL, NAMESPACE_DATABASE, NAMESPACE_AUTH } from "./constants";
import {
  typeLoginData,
  typeTaskData,
  typeTaskIdentifier,
  typeUserData,
} from "./types";
import { setTaskData } from "./redux/taskDataState";
import { useAppDispatch } from "./redux";
import { setUserData } from "./redux/userDataState";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

// taskData
export const useLoadTaskData = () => {
  const dispatch = useAppDispatch();

  return async () => {
    const res = await fetch(`${SERVER_URL}/${NAMESPACE_DATABASE}`, {
      method: "GET",
      credentials: "include",
    });
    const data = (await res.json()) as typeTaskData[];
    dispatch(setTaskData(data));
    return res;
  };
};

export const usePutTaskData = () => {
  const loadTaskData = useLoadTaskData();

  return async (data: typeTaskData) => {
    const parsedData = {
      ...data,
      description: data.description === "" ? " " : data.description,
    };
    const res = await fetch(`${SERVER_URL}/${NAMESPACE_DATABASE}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsedData),
    });
    await loadTaskData();
    return res;
  };
};

export const usePatchTaskData = () => {
  const loadTaskData = useLoadTaskData();

  return async (data: typeTaskData) => {
    const parsedData = {
      ...data,
      description: data.description === "" ? " " : data.description,
    };
    const res = await fetch(`${SERVER_URL}/${NAMESPACE_DATABASE}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsedData),
    });
    await loadTaskData();
    return res;
  };
};

export const useDeleteTaskData = () => {
  const loadTaskData = useLoadTaskData();

  return async (name: typeTaskIdentifier) => {
    const res = await fetch(`${SERVER_URL}/${NAMESPACE_DATABASE}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(name),
    });
    await loadTaskData();
    return res;
  };
};

// userData

export const usePostLogin = () => {
  const getUser = useGetUserData();
  const navigate = useNavigate();
  const makeToast = useToast();

  return async (loginData: typeLoginData) => {
    const res = await fetch(`${SERVER_URL}/${NAMESPACE_AUTH}/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
    if (res.status === 205) {
      navigate(res.headers.get("Location") as string, { replace: true });
      await getUser();
      window.location.reload();
    } else if (res.status === 401) {
      makeToast({
        position: "top",
        title: "Login Result",
        description: "Incorrect id or password",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    return res;
  };
};

export const useGetUserData = () => {
  const dispatch = useAppDispatch();

  return async () => {
    const res = await fetch(`${SERVER_URL}/${NAMESPACE_AUTH}/userData`, {
      method: "GET",
      credentials: "include",
    });
    if (res.status === 200) {
      const data = { ...(await res.json()), isLoggedIn: true } as typeUserData;
      dispatch(setUserData(data));
    }
    return res;
  };
};

export const useLogout = () => {
  const getUser = useGetUserData();
  const navigate = useNavigate();

  return async () => {
    console.log("request to log out");
    const res = await fetch(`${SERVER_URL}/${NAMESPACE_AUTH}/logout`, {
      method: "POST",
      credentials: "include",
    });
    console.log("status", res.status);
    if (res.status === 205) {
      navigate(res.headers.get("Location") as string, { replace: true });
      await getUser();
      window.location.reload();
    }
    return res;
  };
};
