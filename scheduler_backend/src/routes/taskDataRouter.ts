import Router from "@koa/router";
import { Next, ParameterizedContext } from "koa";
import { TaskModel } from "../models";
import { taskZodSchema, State, taskIdentifierZodSchema } from "../types";
import { requireAuthMiddleware } from "../auth";

export const taskDataRouter = new Router<State>();

// with authentication

taskDataRouter.get(
  `/`,
  requireAuthMiddleware(
    async (ctx: ParameterizedContext<State>, next: Next) => {
      const found = await TaskModel.find().lean().exec();
      ctx.assert(found, 404);

      ctx.status = 200;
      ctx.body = found;
      ctx.header["content-type"] = "application/json";

      return await next();
    }
  )
);

taskDataRouter.put(
  `/`,
  requireAuthMiddleware(
    async (ctx: ParameterizedContext<State>, next: Next) => {
      const bodyparse = taskZodSchema.safeParse(ctx.request.body);
      ctx.assert(bodyparse.success, 400);

      const found = await TaskModel.findOne({ name: bodyparse.data.name })
        .lean()
        .exec();
      ctx.assert(found === null, 409);

      const model = new TaskModel(bodyparse.data);
      await model.save();

      ctx.status = 201;

      await next();
    }
  )
);

taskDataRouter.delete(
  `/`,
  requireAuthMiddleware(
    async (ctx: ParameterizedContext<State>, next: Next) => {
      const bodyparse = taskIdentifierZodSchema.safeParse(ctx.request.body);
      ctx.assert(bodyparse.success, 400);
      const document = await TaskModel.findOne({
        name: bodyparse.data.name,
      }).exec();
      ctx.assert(document, 404);

      await document.deleteOne();

      ctx.status = 200; // maybe 204

      await next();
    }
  )
);

taskDataRouter.patch(
  `/`,
  requireAuthMiddleware(
    async (ctx: ParameterizedContext<State>, next: Next) => {
      const bodyparse = taskZodSchema.safeParse(ctx.request.body);
      ctx.assert(bodyparse.success, 400);

      const document = await TaskModel.findOne({
        name: bodyparse.data.name,
      }).exec();
      ctx.assert(document, 404);

      await document.updateOne({ ...bodyparse.data });

      ctx.status = 200; // maybe 204

      await next();
    }
  )
);
