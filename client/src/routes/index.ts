import { Router, Request, Response } from "express";
import { AdminController } from "../controller";

const router = Router();
const adminController = new AdminController();

router.get("/teachers", (req: Request, res: Response) => {
  adminController.getAllTeachers(req, res);
});

router.post("/teacher", (req: Request, res: Response) => {
  adminController.createTeacher(req, res);
});

router.get("/classes", (req: Request, res: Response) => {
  adminController.getAllClasses(req, res);
});

router.post("/classes", (req: Request, res: Response) => {
  adminController.createClass(req, res);
});

module.exports = router;
