/*
  Warnings:

  - Added the required column `cart_id` to the `orderlines` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orderlines" ADD COLUMN     "cart_id" TEXT NOT NULL;
