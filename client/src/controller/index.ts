import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { PrismaClient } from "@prisma/client";

export class AdminController {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAllTeachers(req: Request, res: Response) {
    try {
      const teachers = await this.prisma.teacher.findMany({
        where: {
          isActive: true,
        },
      });
      res.status(StatusCodes.OK).json(teachers);
    } catch (error: any) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
    }
  }

  async createTeacher(req: Request, res: Response) {
    try {
      const { name, email, subject, contactNumber } = req.body;

      const subjectData = await this.prisma.option.findFirst({
        where: {
          label: subject,
        },
      });

      if (!subjectData)
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: "Unable to find subject." });

      const teacher = await this.prisma.teacher.create({
        data: {
          name,
          email,
          contactNumber,
          subjectId: subjectData?.id,
        },
      });

      res.status(StatusCodes.CREATED).json({
        message: "Successfully register a new teacher!",
        data: teacher,
      });
    } catch (error: any) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
    }
  }

  async getAllClasses(req: Request, res: Response) {
    try {
      const classes = await this.prisma.class.findMany({
        include: {
          formTeacher: true,
        },
      });

      res.status(StatusCodes.OK).json(classes);
    } catch (error: any) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
    }
  }

  async createClass(req: Request, res: Response) {
    try {
      const { name, level, teacherEmail } = req.body;

      const classLevel = await this.prisma.option.findFirst({
        where: {
          label: level,
        },
      });

      if (!classLevel)
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: "Unable to find class level." });

      const teacher = await this.prisma.teacher.findFirst({
        where: {
          email: teacherEmail,
        },
      });

      if (!teacher)
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: "Unable to find teacher." });

      const newClass = await this.prisma.class.create({
        data: {
          name,
          levelId: classLevel.id,
          teacherId: teacher.id,
        },
      });

      res
        .status(StatusCodes.CREATED)
        .json({ message: "Successfully created new class!", data: newClass });
    } catch (error: any) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
    }
  }
}
