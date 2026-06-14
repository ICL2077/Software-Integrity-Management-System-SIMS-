import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const software = await prisma.software.findUnique({
        where: { id: id },
        include: {
            installations: true,
        },
    });

    return NextResponse.json(software);
}
