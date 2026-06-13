import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const devices = await prisma.device.findMany({ include: { installations: true } });

    return NextResponse.json(devices);
}
