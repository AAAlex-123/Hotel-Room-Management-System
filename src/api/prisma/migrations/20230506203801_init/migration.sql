-- CreateTable
CREATE TABLE `Room` (
    `room_number` VARCHAR(191) NOT NULL,
    `occupied` BOOLEAN NOT NULL DEFAULT false,
    `cleaning_status` ENUM('DIRTY', 'PENDING_UPLOAD', 'PENDING_CHECK', 'CLEAN', 'INSPECTED') NOT NULL DEFAULT 'CLEAN',
    `service` BOOLEAN NOT NULL DEFAULT false,
    `out_of_order` BOOLEAN NOT NULL DEFAULT false,
    `clean_type` ENUM('DAILY', 'DEEP') NOT NULL DEFAULT 'DAILY',
    `group_id` INTEGER NULL,
    `roomDescriptionRoom_number` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`room_number`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reservation` (
    `reservation_id` INTEGER NOT NULL AUTO_INCREMENT,
    `room_number` VARCHAR(191) NOT NULL,
    `client_id` INTEGER NOT NULL,
    `has_paid` BOOLEAN NOT NULL,
    `arrival` DATETIME(3) NOT NULL,
    `departure` DATETIME(3) NOT NULL,

    PRIMARY KEY (`reservation_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chambermaid_note` (
    `note_id` INTEGER NOT NULL AUTO_INCREMENT,
    `completed` BOOLEAN NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `room_number` VARCHAR(191) NOT NULL,
    `employee_id` INTEGER NOT NULL,

    PRIMARY KEY (`note_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Client` (
    `client_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `cellphone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`client_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Housekeeper` (
    `housekeeper_id` INTEGER NOT NULL AUTO_INCREMENT,
    `employee_id` INTEGER NOT NULL,
    `group_id` INTEGER NULL,

    UNIQUE INDEX `Housekeeper_employee_id_key`(`employee_id`),
    UNIQUE INDEX `Housekeeper_group_id_key`(`group_id`),
    PRIMARY KEY (`housekeeper_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChamberMaid` (
    `chambermaid_id` INTEGER NOT NULL AUTO_INCREMENT,
    `employee_id` INTEGER NOT NULL,
    `group_id` INTEGER NULL,

    UNIQUE INDEX `ChamberMaid_employee_id_key`(`employee_id`),
    PRIMARY KEY (`chambermaid_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Employee` (
    `employee_id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('HOUSEKEEPER', 'CHAIMBERMAID', 'KITCHEN', 'RECEPTION') NOT NULL,
    `login` VARCHAR(191) NOT NULL,
    `login_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`employee_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Group` (
    `group_id` INTEGER NOT NULL,
    `room_number` VARCHAR(191) NOT NULL,
    `chambermaid_id` INTEGER NOT NULL,
    `housekeeper_id` INTEGER NOT NULL,

    PRIMARY KEY (`group_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `order_id` INTEGER NOT NULL AUTO_INCREMENT,
    `room_number` VARCHAR(191) NOT NULL,
    `chambermaid_id` INTEGER NOT NULL,
    `group_id` INTEGER NOT NULL,
    `complete` BOOLEAN NOT NULL,
    `creation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`order_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProvisionOrder` (
    `order_id` INTEGER NOT NULL,
    `amount` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`order_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MenuOrder` (
    `order_id` INTEGER NOT NULL,
    `menu_id` INTEGER NOT NULL,
    `amount` INTEGER NOT NULL,

    PRIMARY KEY (`order_id`, `menu_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MenuItem` (
    `menu_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `availability` BOOLEAN NOT NULL,

    PRIMARY KEY (`menu_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RoomEvent` (
    `event_id` INTEGER NOT NULL AUTO_INCREMENT,
    `timestamp` DATETIME(3) NOT NULL,
    `event_type` ENUM('CLEAN', 'DEEP_CLEAN', 'INSPECT', 'UPLOAD', 'CANCELLED', 'BLOCKED', 'REINSTITUTED') NOT NULL,
    `occupied` BOOLEAN NOT NULL,
    `room_number` VARCHAR(191) NOT NULL,
    `employee_id` INTEGER NOT NULL,

    PRIMARY KEY (`event_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RoomDescription` (
    `room_number` VARCHAR(191) NOT NULL,
    `roomType` VARCHAR(191) NOT NULL,
    `roomClass` VARCHAR(191) NOT NULL,
    `floor` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`room_number`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Room` ADD CONSTRAINT `Room_group_id_fkey` FOREIGN KEY (`group_id`) REFERENCES `Group`(`group_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_room_number_fkey` FOREIGN KEY (`room_number`) REFERENCES `Room`(`room_number`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `Client`(`client_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chambermaid_note` ADD CONSTRAINT `chambermaid_note_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `Employee`(`employee_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chambermaid_note` ADD CONSTRAINT `chambermaid_note_room_number_fkey` FOREIGN KEY (`room_number`) REFERENCES `Room`(`room_number`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Housekeeper` ADD CONSTRAINT `Housekeeper_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `Employee`(`employee_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Housekeeper` ADD CONSTRAINT `Housekeeper_group_id_fkey` FOREIGN KEY (`group_id`) REFERENCES `Group`(`group_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChamberMaid` ADD CONSTRAINT `ChamberMaid_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `Employee`(`employee_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChamberMaid` ADD CONSTRAINT `ChamberMaid_group_id_fkey` FOREIGN KEY (`group_id`) REFERENCES `Group`(`group_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_group_id_fkey` FOREIGN KEY (`group_id`) REFERENCES `Group`(`group_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_room_number_fkey` FOREIGN KEY (`room_number`) REFERENCES `Room`(`room_number`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_chambermaid_id_fkey` FOREIGN KEY (`chambermaid_id`) REFERENCES `ChamberMaid`(`chambermaid_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProvisionOrder` ADD CONSTRAINT `ProvisionOrder_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `Order`(`order_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MenuOrder` ADD CONSTRAINT `MenuOrder_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `Order`(`order_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MenuOrder` ADD CONSTRAINT `MenuOrder_menu_id_fkey` FOREIGN KEY (`menu_id`) REFERENCES `MenuItem`(`menu_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoomEvent` ADD CONSTRAINT `RoomEvent_room_number_fkey` FOREIGN KEY (`room_number`) REFERENCES `Room`(`room_number`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoomEvent` ADD CONSTRAINT `RoomEvent_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `Employee`(`employee_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoomDescription` ADD CONSTRAINT `RoomDescription_room_number_fkey` FOREIGN KEY (`room_number`) REFERENCES `Room`(`room_number`) ON DELETE RESTRICT ON UPDATE CASCADE;
