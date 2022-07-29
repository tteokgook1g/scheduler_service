export interface typeTaskData {
  name: string;
  date: Date;
  description: string;
}

export interface typeUserData {
  isLoggedIn: boolean;
  id?: string;
}

export const defaultTaskData = {
  name: "default",
  date: new Date(),
  description: "",
};

export interface typeLoginData {
  id: string;
  password: string;
}

export const defaultLoginData: typeLoginData = {
  id: "",
  password: "",
};

export interface typeTaskIdentifier {
  name: string;
}
