import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const search = req.nextUrl.searchParams.get('search');
    const hasSearchParam = req.nextUrl.searchParams.has('search');

    const searchArray = search ? search.trim().split(' ').filter(Boolean) : [];

    const devices = await prisma.device.findMany({
        where: {
            ...(hasSearchParam && {
                OR: searchArray.map((itm) => ({
                    hostname: { contains: itm.trim(), mode: 'insensitive' },
                })),
            }),
        },
        include: { installations: true },
    });

    return NextResponse.json(devices);
}

export async function POST(req: NextRequest) {
    const formData = await req.formData();

    const body = {
        hostname: formData.get('hostname') as string,
        os: formData.get('os') as string,
        department: formData.get('department') as string,
        user: formData.get('user') as string,
    };

    const isExisting = await prisma.device.findUnique({
        where: { hostname: body.hostname },
    });

    if (isExisting) throw Error('Такая программа уже занесена в бд');

    const device = await prisma.device.create({
        data: {
            ...body,
        },
    });

    return NextResponse.json(device);
}
