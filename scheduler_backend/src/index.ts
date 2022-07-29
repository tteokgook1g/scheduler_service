import cors from "@koa/cors";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import commandLineLogger from "koa-logger";
import { removeMetadata, parseDate, logger } from "./middlewares";
import { rootRouter } from "./routes";
import { FRONTEND_DIR, FRONTEND_URL, PORT, SESSION_KEY } from "./constants";
import serve from "koa-static";
import session from "koa-session";
import passport from "koa-passport";
import { strategy, userSerializer, userDeserializer } from "./auth";
import cookie from "koa-cookie";

const app = new Koa();

app.keys = [SESSION_KEY];
app.use(session(app));

app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(commandLineLogger());
app.use(bodyParser());
app.use(cookie());

passport.use(strategy);
passport.serializeUser(userSerializer);
passport.deserializeUser(userDeserializer);
app.use(passport.initialize());
app.use(passport.session());

app.use(serve(FRONTEND_DIR));

app.use(logger);

app.use(removeMetadata);
app.use(parseDate);

app.use(rootRouter.routes());

app.on("error", (e) => console.error("Error", e));
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

