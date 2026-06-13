import fs from 'fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import prisma from './prisma';

export async function processImage(file: File, id: string) {
    const device = await prisma.device.findUnique({
        where: { id: id },
    });

    if (!device) return;

    const uploadDir = path.join(process.cwd(), 'public/devices', id);
    await fs.mkdir(uploadDir, { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());

    const fileName = `${device.id}.webp`; // конвертация в webp
    const filePath = path.join(uploadDir, fileName);
    const publicUrl = `/objects/${device.id}/${fileName}`;

    // сжатие изображения обычного качества
    await sharp(buffer)
        .resize(1980, 1020, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(filePath);

    return publicUrl;
}
