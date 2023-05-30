/*
  Warnings:

  - You are about to drop the `menu_locations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `menus_menucategrories` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `price` on table `addons` required. This step will fail if there are existing NULL values in that column.
  - Made the column `addon_category_id` on table `addons` required. This step will fail if there are existing NULL values in that column.
  - Made the column `menu_id` on table `addons_menus` required. This step will fail if there are existing NULL values in that column.
  - Made the column `addon_category_id` on table `addons_menus` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `locations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `companies_id` on table `locations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `companies_id` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "menu_locations" DROP CONSTRAINT "menu_locations_location_id_fkey";

-- DropForeignKey
ALTER TABLE "menu_locations" DROP CONSTRAINT "menu_locations_menu_id_fkey";

-- DropForeignKey
ALTER TABLE "menus_menucategrories" DROP CONSTRAINT "menus_menucategrories_menu_categories_id_fkey";

-- DropForeignKey
ALTER TABLE "menus_menucategrories" DROP CONSTRAINT "menus_menucategrories_menu_id_fkey";

-- AlterTable
ALTER TABLE "addons" ALTER COLUMN "price" SET NOT NULL,
ALTER COLUMN "addon_category_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "addons_menus" ALTER COLUMN "menu_id" SET NOT NULL,
ALTER COLUMN "addon_category_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "locations" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "companies_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "companies_id" SET NOT NULL;

-- DropTable
DROP TABLE "menu_locations";

-- DropTable
DROP TABLE "menus_menucategrories";

-- CreateTable
CREATE TABLE "menu_menu_categories_locations" (
    "id" SERIAL NOT NULL,
    "menu_id" INTEGER NOT NULL,
    "menu_categories_id" INTEGER NOT NULL,
    "location_id" INTEGER NOT NULL,
    "is_available" BOOLEAN DEFAULT true,

    CONSTRAINT "menu_menu_categories_locations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "menu_menu_categories_locations" ADD CONSTRAINT "menu_menu_categories_locations_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menu_menu_categories_locations" ADD CONSTRAINT "menu_menu_categories_locations_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "menus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menu_menu_categories_locations" ADD CONSTRAINT "menu_menu_categories_locations_menu_categories_id_fkey" FOREIGN KEY ("menu_categories_id") REFERENCES "menu_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
