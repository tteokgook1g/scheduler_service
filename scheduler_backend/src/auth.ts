import { Strategy as LocalStrategy } from "passport-local";
import { UserModel } from "./models";
import bcrypt from "bcryptjs";
import { typeLoginData, typeUserData, typeUserSerialization } from "./types";
import { Next, ParameterizedContext } from "koa";
import { State } from "./types";

export const requireAuthMiddleware = (
  middleware: (ctx: ParameterizedContext<State>, next: Next) => Promise<any>
) => {
  return async (ctx: ParameterizedContext<State>, next: Next) => {
    if (ctx.isUnauthenticated()) {
      ctx.status = 401;
      return await next();
    } else {
      return await middleware(ctx, next);
    }
  };
};

export const strategy = new LocalStrategy(
  { usernameField: "id", passwordField: "password" },
  async (id: string, password: string, done) => {
    const user = await UserModel.findOne({ id: id }).lean().exec();
    if (user === null) {
      return done(null, false, { message: "Incorrect username" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return done(null, false, { message: "Password is incorrect" });
    }
    return done(null, user as typeLoginData);
  }
);

export const userSerializer = (
  user: Express.User,
  done: (err: any, id?: unknown) => void
): void => {
  return done(null, {
    id: (user as typeUserSerialization).id,
  });
};

export const userDeserializer = async (
  serial: typeUserSerialization,
  done: (err: any, user?: false | Express.User | null | undefined) => void
) => {
  try {
    const user = await UserModel.findOne({ id: serial.id }).lean().exec();
    return done(null, user as typeUserData);
  } catch (err) {
    return done(err);
  }
};
