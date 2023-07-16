/*
  Warnings:

  - You are about to drop the column `order_status` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orderlines" ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "order_status",
ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 0;
