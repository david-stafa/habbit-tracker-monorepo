/*
  Warnings:

  - A unique constraint covering the columns `[habitId,date]` on the table `habitInstance` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Weekday" AS ENUM ('everyDay', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');

-- AlterTable
ALTER TABLE "habit" ADD COLUMN     "scheduleDays" "Weekday"[] DEFAULT ARRAY['everyDay']::"Weekday"[];

-- CreateIndex
CREATE UNIQUE INDEX "habitInstance_habitId_date_key" ON "habitInstance"("habitId", "date");
