import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export class AdminController {
  constructor() {}

  async getAllTeachers(req: Request, res: Response) {
    try {
      res.status(StatusCodes.OK).json({ message: "Get All Teachers" });
    } catch (error: any) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
    }
  }

  async createTeacher(req: Request, res: Response) {
    try {
      res.status(StatusCodes.OK).json({ message: "Create Teachers" });
    } catch (error: any) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
    }
  }

  async getAllClasses(req: Request, res: Response) {
    try {
      res.status(StatusCodes.OK).json({ message: "Get All Classes" });
    } catch (error: any) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
    }
  }

  async createClass(req: Request, res: Response) {
    try {
      res.status(StatusCodes.OK).json({ message: "Create Classes" });
    } catch (error: any) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
    }
  }
}
