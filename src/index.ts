import express, { Express, Application, Request, Response } from "express";
import * as http from "http";
import cors from "cors";
import debug, { IDebugger } from "debug";
import "dotenv/config";

import {AuthController} from "./modules/Auth/controllers/auth.controller";
import {IUser} from "./modules/User/interface/user.interface";
import {TaskController} from "./modules/Task/controllers/task.controller";

const app: Express = express();
declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//Adding controllers
new AuthController(app);
new TaskController(app);

const PORT = process.env.PORT || 8000;
const debugLog: IDebugger = debug("app");

if (process.env.DEBUG) {
    process.on("unhandledRejection", function (reason) {
        debugLog("Unhandled Rejection:", reason);
        process.exit(1);
    });
} else {
}

const server: http.Server = http.createServer(app);
server.listen(PORT, () => {
    console.debug(`Server is running on ${PORT}`);
});


