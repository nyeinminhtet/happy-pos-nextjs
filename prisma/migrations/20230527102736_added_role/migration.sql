-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'manager');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'admin';
