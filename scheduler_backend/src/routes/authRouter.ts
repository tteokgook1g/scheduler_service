import Router from "@koa/router";
import passport from "koa-passport";
import { Next, ParameterizedContext } from "koa";
import bcrypt from "bcryptjs";
import { UserModel } from "../models";
import { State, userDataZodSchema } from "../types";
import { requireAuthMiddleware } from "../auth";

export const authRouter = new Router<State>();

authRouter.post(
  "/login",
  passport.authenticate("local", {}),
  async (ctx: ParameterizedContext<State>, next: Next) => {
    ctx.status = 205; // 205 if login is successful, 401 otherwise
    ctx.set("Location", "/");
    await next();
  }
);

authRouter.post(
  "/logout",
  async (ctx: ParameterizedContext<State>, next: Next) => {
    ctx.logout();
    // ctx.redirect("/");
    ctx.status = 205;
    ctx.set("Location", "/");
    await next();
  }
);

authRouter.put(
  "/signup",
  async (ctx: ParameterizedContext<State>, next: Next) => {
    const bodyparse = userDataZodSchema.safeParse(ctx.request.body);
    ctx.assert(bodyparse.success, 400);

    const found = await UserModel.findOne({ name: bodyparse.data.id })
      .lean()
      .exec();
    ctx.assert(found === null, 409);

    const hashedPW = {
      ...bodyparse.data,
      password: bcrypt.hashSync(bodyparse.data.password),
    };

    const model = new UserModel(hashedPW);
    await model.save();

    ctx.status = 201;

    await next();
  }
);

authRouter.get(
  "/userData",
  requireAuthMiddleware(
    async (ctx: ParameterizedContext<State>, next: Next) => {
      ctx.status = 200;
      ctx.set("Content-Type", "application/json");
      ctx.body = { ...ctx.state.user, password: undefined };
      await next();
    }
  )
);
