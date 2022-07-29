import { z } from "zod";

export type State = {
  user: typeUserData;
};

export const taskZodSchema = z.object({
  name: z.string(),
  date: z.date(),
  description: z.string(),
});

export const taskIdentifierZodSchema = z.object({ name: z.string() });

export type typeTaskData = z.infer<typeof taskZodSchema>;

export const userDataZodSchema = z.object({
  id: z.string(),
  password: z.string(),
});

export type typeUserData = z.infer<typeof userDataZodSchema>;

export interface typeLoginData {
  id: string;
  password: string;
}

export interface typeUserSerialization {
  id: string;
}

