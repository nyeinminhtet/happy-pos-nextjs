/*
  Warnings:

  - You are about to drop the column `category_of_addon` on the `addon_categories` table. All the data in the column will be lost.
  - Added the required column `name` to the `addon_categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "addon_categories" DROP COLUMN "category_of_addon",
ADD COLUMN     "is_require" BOOLEAN DEFAULT false,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "addons" ADD COLUMN     "is_available" BOOLEAN DEFAULT true;
