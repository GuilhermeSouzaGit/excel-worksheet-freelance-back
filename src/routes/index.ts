import { Router } from "express";
import { WorksheetRoutes } from "./Worksheet.routes";
import { PostgreSQLConnection } from "../db/connectDB";

const dbConn = new PostgreSQLConnection();
dbConn.conn();

const routes = Router();

routes.use("/api/worksheet/", WorksheetRoutes);

export { routes };
