import { PrismaClient } from '../../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error('DATABASE_URL is not defined in .env file');
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function up() {
    // ── Категории ──────────────────────────────────────────────
    const category_graphic = await prisma.category.create({
        data: { name: 'Графический' },
    });
    const category_calculating = await prisma.category.create({
        data: { name: 'Вычисления' },
    });
    const category_statistics = await prisma.category.create({
        data: { name: 'Статистика' },
    });

    // ── ПО ─────────────────────────────────────────────────────
    const photoshop = await prisma.software.create({
        data: {
            name: 'Photoshop',
            developer: 'Adobe',
            version: '25.0.0',
            categoryId: category_graphic.id,
        },
    });
    const gimp = await prisma.software.create({
        data: {
            name: 'GIMP',
            developer: 'GIMP Team',
            version: '2.10.36',
            categoryId: category_graphic.id,
        },
    });
    const excel = await prisma.software.create({
        data: {
            name: 'Excel',
            developer: 'Microsoft',
            version: '16.0.0',
            categoryId: category_statistics.id,
        },
    });
    const calculator = await prisma.software.create({
        data: {
            name: 'Calculator',
            developer: 'BirLab',
            version: '0.3.5',
            categoryId: category_calculating.id,
        },
    });
    const matlab = await prisma.software.create({
        data: {
            name: 'MATLAB',
            developer: 'MathWorks',
            version: 'R2024a',
            categoryId: category_calculating.id,
        },
    });

    // ── Лицензии ───────────────────────────────────────────────
    const photoshop_license = await prisma.license.create({
        data: {
            key: 'PS-1234-ABCD-5678-EFGH',
            type: 'Subscription',
            purchaseDate: new Date('2024-01-01'),
            expirationDate: new Date('2025-01-01'),
            totalSeats: 3,
            usedSeats: 0,
            softwareId: photoshop.id,
        },
    });
    const excel_license = await prisma.license.create({
        data: {
            key: 'XL-9999-WXYZ-0000-QRST',
            type: 'Perpetual',
            purchaseDate: new Date('2023-06-15'),
            totalSeats: 5,
            usedSeats: 0,
            softwareId: excel.id,
        },
    });
    const matlab_license = await prisma.license.create({
        data: {
            key: 'ML-5555-MNOP-1111-IJKL',
            type: 'Subscription',
            purchaseDate: new Date('2024-03-01'),
            expirationDate: new Date('2025-03-01'),
            totalSeats: 2,
            usedSeats: 0,
            softwareId: matlab.id,
        },
    });

    // ── Устройства ─────────────────────────────────────────────
    const computer_one = await prisma.device.create({
        data: {
            hostname: 'Computer_one',
            os: 'Debian 12',
            ipAddress: '192.168.1.101',
            department: 'IT, кабинет 107',
            user: 'Андрюха',
        },
    });
    const computer_two = await prisma.device.create({
        data: {
            hostname: 'Computer_two',
            os: 'Windows 11',
            ipAddress: '192.168.1.102',
            department: 'Бухгалтерия, кабинет 203',
            user: 'Марина',
        },
    });
    const computer_three = await prisma.device.create({
        data: {
            hostname: 'Computer_three',
            os: 'Ubuntu 24.04',
            ipAddress: '192.168.1.103',
            department: 'IT, кабинет 107',
            user: 'Серёга',
        },
    });

    // ── Установки — Computer_one (дизайнер, Linux) ────────────
    await prisma.installation.create({
        data: {
            softwareId: gimp.id, // бесплатный — без лицензии
            deviceId: computer_one.id,
        },
    });
    await prisma.installation.create({
        data: {
            softwareId: photoshop.id,
            deviceId: computer_one.id,
            licenseId: photoshop_license.id,
        },
    });

    // ── Установки — Computer_two (бухгалтерия, Windows) ───────
    await prisma.installation.create({
        data: {
            softwareId: excel.id,
            deviceId: computer_two.id,
            licenseId: excel_license.id,
        },
    });
    await prisma.installation.create({
        data: {
            softwareId: calculator.id, // бесплатный — без лицензии
            deviceId: computer_two.id,
        },
    });

    // ── Установки — Computer_three (IT, Ubuntu) ────────────────
    await prisma.installation.create({
        data: {
            softwareId: matlab.id,
            deviceId: computer_three.id,
            licenseId: matlab_license.id,
        },
    });
    await prisma.installation.create({
        data: {
            softwareId: calculator.id, // бесплатный — без лицензии
            deviceId: computer_three.id,
        },
    });
    await prisma.installation.create({
        data: {
            softwareId: gimp.id, // бесплатный — без лицензии
            deviceId: computer_three.id,
        },
    });

    // ── Обновляем usedSeats ────────────────────────────────────
    await prisma.license.update({
        where: { id: photoshop_license.id },
        data: { usedSeats: 1 },
    });
    await prisma.license.update({
        where: { id: excel_license.id },
        data: { usedSeats: 1 },
    });
    await prisma.license.update({
        where: { id: matlab_license.id },
        data: { usedSeats: 1 },
    });
}

async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "Software" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Device" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "License" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Installation" RESTART IDENTITY CASCADE`;
}

async function main() {
    await down();
    await up();
}

main()
    .catch((e) => {
        console.error('❌ Seeding error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
