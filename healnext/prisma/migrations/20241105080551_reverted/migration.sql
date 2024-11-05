/*
  Warnings:

  - You are about to drop the column `userId` on the `session` table. All the data in the column will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `session` DROP FOREIGN KEY `Session_userId_fkey`;

-- AlterTable
ALTER TABLE `session` DROP COLUMN `userId`;

-- DropTable
DROP TABLE `user`;
