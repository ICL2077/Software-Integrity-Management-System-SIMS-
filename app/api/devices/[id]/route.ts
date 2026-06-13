import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const device = await prisma.device.findUnique({
        where: { id: id },
        include: {
            installations: {
                include: {
                    software: true,
                },
            },
        },
    });

    return NextResponse.json(device);
}
