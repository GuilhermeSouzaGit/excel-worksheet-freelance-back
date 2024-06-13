import { Router } from "express";
// import { UserControllers } from "../controllers/User.controller";
import { excelUpload } from "../helpers/excelUpload";
import { WorksheetControllers } from "../controllers/Worksheet.controller";

const WorksheetRoutes = Router();

const fileUpload = excelUpload();

const worksheetController = new WorksheetControllers();

WorksheetRoutes.get("/status", worksheetController.getStatus);
WorksheetRoutes.post(
	"/upload",
	fileUpload.single("file"),
	worksheetController.uploadSpreadsheetData
);
WorksheetRoutes.get("/get", worksheetController.getSpreadsheetData);
WorksheetRoutes.post("/delete-all", worksheetController.deleteAllData);

export { WorksheetRoutes };
