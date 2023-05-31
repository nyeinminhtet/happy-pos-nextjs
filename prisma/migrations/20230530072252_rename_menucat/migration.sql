/*
  Warnings:

  - You are about to drop the column `name` on the `menu_categories` table. All the data in the column will be lost.
  - Added the required column `category` to the `menu_categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "menu_categories" DROP COLUMN "name",
ADD COLUMN     "category" TEXT NOT NULL;
