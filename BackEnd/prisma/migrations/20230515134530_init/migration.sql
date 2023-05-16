/*
  Warnings:

  - Added the required column `role` to the `Person` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "Person" ADD COLUMN     "role" "Role" NOT NULL;
