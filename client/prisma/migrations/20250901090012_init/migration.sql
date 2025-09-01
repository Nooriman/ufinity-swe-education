-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "config";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "institution";

-- CreateTable
CREATE TABLE "config"."options" (
    "id" SERIAL NOT NULL,
    "category" VARCHAR(50) NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "label" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "institution"."teachers" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "contact_number" VARCHAR(30) NOT NULL,
    "subject_id" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "teachers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "institution"."classes" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "level_id" INTEGER NOT NULL,
    "teacher_id" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "classes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "options_category_is_active_sort_order_idx" ON "config"."options"("category", "is_active", "sort_order");

-- CreateIndex
CREATE UNIQUE INDEX "options_category_code_key" ON "config"."options"("category", "code");

-- CreateIndex
CREATE UNIQUE INDEX "teachers_email_key" ON "institution"."teachers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "classes_name_level_id_key" ON "institution"."classes"("name", "level_id");

-- AddForeignKey
ALTER TABLE "institution"."teachers" ADD CONSTRAINT "teachers_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "config"."options"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "institution"."classes" ADD CONSTRAINT "classes_level_id_fkey" FOREIGN KEY ("level_id") REFERENCES "config"."options"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "institution"."classes" ADD CONSTRAINT "classes_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "institution"."teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
