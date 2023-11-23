/*
  Warnings:

  - You are about to drop the column `available` on the `products` table. All the data in the column will be lost.
  - Added the required column `avaliable` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "available",
ADD COLUMN     "avaliable" BOOLEAN NOT NULL;
