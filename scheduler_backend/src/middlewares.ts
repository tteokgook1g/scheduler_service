import { ParameterizedContext, Next } from "koa";
import { State } from "./types";

export const removeMetadata = async (
  ctx: ParameterizedContext<State>,
  next: Next
) => {
  await next();

  if (ctx.body) {
    ctx.body = JSON.parse(
      JSON.stringify(ctx.body, (k, v) =>
        k === "_id" || k === "__v" ? undefined : v
      )
    );
  }
};

export const parseDate = async (
  ctx: ParameterizedContext<State>,
  next: Next
) => {
  if (ctx.request.body?.date !== undefined) {
    ctx.request.body.date = new Date(ctx.request.body.date);
  }
  await next();
};

export const logger = async (ctx: ParameterizedContext<State>, next: Next) => {
  console.log(ctx.origin);
  console.log(ctx.request.body);
  await next();
};

