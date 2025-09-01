/*
  Warnings:

  - You are about to drop the column `teacher_id` on the `classes` table. All the data in the column will be lost.
  - Added the required column `teacher_email` to the `classes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "institution"."classes" DROP CONSTRAINT "classes_teacher_id_fkey";

-- AlterTable
ALTER TABLE "institution"."classes" DROP COLUMN "teacher_id",
ADD COLUMN     "teacher_email" VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE "institution"."classes" ADD CONSTRAINT "classes_teacher_email_fkey" FOREIGN KEY ("teacher_email") REFERENCES "institution"."teachers"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
