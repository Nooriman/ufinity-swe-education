/*
  Warnings:

  - Changed the type of `teacher_email` on the `classes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "institution"."classes" DROP CONSTRAINT "classes_teacher_email_fkey";

-- AlterTable
ALTER TABLE "institution"."classes" DROP COLUMN "teacher_email",
ADD COLUMN     "teacher_email" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "institution"."classes" ADD CONSTRAINT "classes_teacher_email_fkey" FOREIGN KEY ("teacher_email") REFERENCES "institution"."teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
