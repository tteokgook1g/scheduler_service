import { Box } from "@chakra-ui/react";
import "./App.css";
import { LoginPage } from "./tab_page/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./tab_page/HomePage";
import { Header } from "./component/Header";
import { useGetUserData } from "./serverRequest";

export const App = () => {
  useGetUserData()();

  return (
    <BrowserRouter>
      <Box className="app">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
};
