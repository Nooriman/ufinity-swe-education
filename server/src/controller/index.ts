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
        include: {
          subject: true,
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

      if (!name || !email || !subject || !contactNumber)
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: "Missing form field." });

      const subjectData = await this.prisma.option.findFirst({
        where: {
          code: subject,
        },
      });

      if (!subjectData)
        return res
          .status(StatusCodes.UNPROCESSABLE_ENTITY)
          .json({ message: "Invalid subject." });

      const teacher = await this.prisma.teacher.create({
        data: {
          name,
          email,
          contactNumber: String(contactNumber),
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
          level: true,
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

      if (!name || !level || !teacherEmail)
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: "Missing form fields." });

      const classLevel = await this.prisma.option.findFirst({
        where: {
          code: level,
          isActive: true,
        },
      });

      if (!classLevel)
        return res
          .status(StatusCodes.UNPROCESSABLE_ENTITY)
          .json({ message: "Invalid class level." });

      const teacher = await this.prisma.teacher.findFirst({
        where: {
          email: teacherEmail,
          isActive: true,
        },
      });

      if (!teacher)
        return res
          .status(StatusCodes.NOT_FOUND)
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

  async getDropdownOptions(req: Request, res: Response) {
    const module = req.params.module;

    if (!module)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Missing Params" });

    try {
      if (module === "class_level") {
        const level = await this.prisma.option.findMany({
          where: {
            category: module,
          },
        });
        const teachers = await this.prisma.teacher.findMany();

        return res.status(StatusCodes.OK).json({ level, teachers });
      } else {
        const subject = await this.prisma.option.findMany({
          where: { category: module },
        });
        return res.status(StatusCodes.OK).json({ subject });
      }
    } catch (error: any) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
    }
  }
}
