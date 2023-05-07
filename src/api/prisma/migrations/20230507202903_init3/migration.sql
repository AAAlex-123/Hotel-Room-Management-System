/*
  Warnings:

  - You are about to drop the column `group_id` on the `room` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `room` DROP FOREIGN KEY `Room_group_id_fkey`;

-- AlterTable
ALTER TABLE `room` DROP COLUMN `group_id`;

-- CreateTable
CREATE TABLE `Charge` (
    `reservation_id` INTEGER NOT NULL,
    `timestamp` DATETIME(3) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,

    PRIMARY KEY (`reservation_id`, `timestamp`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GroopRooms` (
    `group_id` INTEGER NOT NULL,
    `room_number` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `GroopRooms_room_number_key`(`room_number`),
    PRIMARY KEY (`group_id`, `room_number`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Charge` ADD CONSTRAINT `Charge_reservation_id_fkey` FOREIGN KEY (`reservation_id`) REFERENCES `Reservation`(`reservation_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GroopRooms` ADD CONSTRAINT `GroopRooms_group_id_fkey` FOREIGN KEY (`group_id`) REFERENCES `Group`(`group_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GroopRooms` ADD CONSTRAINT `GroopRooms_room_number_fkey` FOREIGN KEY (`room_number`) REFERENCES `Room`(`room_number`) ON DELETE RESTRICT ON UPDATE CASCADE;
