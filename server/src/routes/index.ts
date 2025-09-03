import { Router, Request, Response } from "express";
import { AdminController } from "../controller";

const router = Router();
const adminController = new AdminController();

/**
 * @swagger
 * /api/teachers:
 *   post:
 *     summary: Create a teacher
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - subject
 *               - email
 *               - contactNumber
 *           examples:
 *             sample:
 *               value:
 *                 name: Mary
 *                 subject: Mathematics
 *                 email: teachermary@gmail.com
 *                 contactNumber: "68129414"
 *     responses:
 *       201:
 *         description: Teacher created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully register a new teacher!
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 45
 *                     name:
 *                       type: string
 *                       example: Mary
 *                     email:
 *                       type: string
 *                       example: teachermary@gmail.com
 *                     contactNumber:
 *                       type: string
 *                       example: "68129414"
 *                     subjectId:
 *                       type: integer
 *                       example: 3
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-09-01T07:30:12.000Z"
 *       400:
 *         description: Missing or invalid form field(s)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Missing form field.
 *       422:
 *         description: Invalid subject label provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid subject.
 *       500:
 *         description: Unexpected server error
 */
router.post("/teachers", (req: Request, res: Response) => {
  adminController.createTeacher(req, res);
});

/**
 * @swagger
 * /api/teachers:
 *   get:
 *     summary: Get all active teachers
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: List of active teachers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 12
 *                   name:
 *                     type: string
 *                     example: Mary
 *                   email:
 *                     type: string
 *                     example: teachermary@gmail.com
 *                   contactNumber:
 *                     type: string
 *                     example: "68129414"
 *                   subjectId:
 *                     type: integer
 *                     example: 3
 *                   isActive:
 *                     type: boolean
 *                     example: true
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-09-01T06:12:34.000Z"
 *       500:
 *         description: Unexpected server error
 */
router.get("/teachers", (req: Request, res: Response) => {
  adminController.getAllTeachers(req, res);
});

/**
 * @swagger
 * /api/classes:
 *   post:
 *     summary: Create a class
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - level
 *               - name
 *               - teacherEmail
 *             properties:
 *               level:
 *                 type: string
 *                 example: Primary 1
 *               name:
 *                 type: string
 *                 example: Class 1A
 *               teacherEmail:
 *                 type: string
 *                 format: email
 *                 example: teachermary@gmail.com
 *     responses:
 *       201:
 *         description: Class created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully created a new class!
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 45
 *                     level:
 *                       type: string
 *                       example: Primary 1
 *                     name:
 *                       type: string
 *                       example: Class 1A
 *                     formTeacher:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: Mary
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Teacher not found
 *       500:
 *         description: Unexpected server error
 */
router.post("/classes", (req: Request, res: Response) => {
  adminController.createClass(req, res);
});

/**
 * @swagger
 * /api/classes:
 *   get:
 *     summary: Get the list of classes
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: List of classes retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 101
 *                       level:
 *                         type: string
 *                         example: Primary 1
 *                       name:
 *                         type: string
 *                         example: Class 1A
 *                       formTeacher:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: Mary
 *       500:
 *         description: Unexpected server error
 */
router.get("/classes", (req: Request, res: Response) => {
  adminController.getAllClasses(req, res);
});

/**
 * @swagger
 * /api/dropdown-options:
 *   get:
 *     summary: Get dropdown options for class levels and teachers
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Dropdown options retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 level:
 *                   type: array
 *                   description: Available class levels
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       label:
 *                         type: string
 *                         example: Primary 1
 *                       value:
 *                         type: string
 *                         example: P1
 *                       category:
 *                         type: string
 *                         example: class_level
 *                 teachers:
 *                   type: array
 *                   description: Available teachers
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 12
 *                       name:
 *                         type: string
 *                         example: Mary
 *                       email:
 *                         type: string
 *                         example: teachermary@gmail.com
 *                       contactNumber:
 *                         type: string
 *                         example: "68129414"
 *                       subjectId:
 *                         type: integer
 *                         example: 3
 *                       isActive:
 *                         type: boolean
 *                         example: true
 *       500:
 *         description: Unexpected server error
 */
router.get("/dropdown-options/:module", (req: Request, res: Response) => {
  adminController.getDropdownOptions(req, res);
});

module.exports = router;
