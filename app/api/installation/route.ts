import prisma from '../../../lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const body = await req.json();

    const softwareId = body.softwareId;
    const deviceId = body.deviceId;
    const status = body.status;

    const installation = await prisma.installation.create({
        data: {
            softwareId: softwareId,
            deviceId: deviceId,
            ...(status && {
                status: status,
            }),
        },
    });

    return NextResponse.json(installation);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const deletedInstallation = await prisma.installation.delete({
        where: { id: id },
    });

    return NextResponse.json(deletedInstallation);
}

export async function GET(req: NextRequest) {
    const installations = await prisma.installation.findMany({
        include: {
            device: true,
            software: true,
        },
    });

    return NextResponse.json(installations);
}
