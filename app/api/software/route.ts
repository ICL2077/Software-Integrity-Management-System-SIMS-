import prisma from '../../../lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const software = await prisma.software.findMany({ include: { installations: true } });

    return NextResponse.json(software);
}
