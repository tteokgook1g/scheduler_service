/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_SERVER_IP: string;
    REACT_APP_SALT_NUMBER: string;
  }
}
