import { Schema, createConnection } from "mongoose";
import { MONGODB_URI } from "./constants";
import { typeUserData, typeTaskData } from "./types";

export const connection = createConnection(MONGODB_URI ?? "");

export const taskSchema = new Schema<typeTaskData>({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
});

export const TaskModel = connection.model<typeTaskData>("task", taskSchema);

export const userSchema = new Schema<typeUserData>({
  id: { type: String, required: true },
  password: { type: String, required: true },
});

export const UserModel = connection.model<typeUserData>("userData", userSchema);

