import Router from "@koa/router";
import { Next, ParameterizedContext } from "koa";
import { State } from "../types";
import { FRONTEND_DIR } from "../constants";
import send from "koa-send";
import { taskDataRouter } from "./taskDataRouter";
import { authRouter } from "./authRouter";

export const rootRouter = new Router<State>();

rootRouter.get("/", async (ctx: ParameterizedContext<State>, next: Next) => {
  await send(ctx, "index.html", { root: FRONTEND_DIR });
  await next();
});
// redirect to home
rootRouter.get(
  "/login",
  async (ctx: ParameterizedContext<State>, next: Next) => {
    ctx.redirect("/");
    await next();
  }
);

rootRouter.use("/api/task_data", taskDataRouter.routes());
rootRouter.use("/api/auth", authRouter.routes());
