import { CATEGORIES } from '@/generated/prisma/enums';
import prisma from '../../../lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const search = req.nextUrl.searchParams.get('search');
    const hasSearchParam = req.nextUrl.searchParams.has('search');

    const searchArray = search ? search.trim().split(' ').filter(Boolean) : [];

    const software = await prisma.software.findMany({
        where: {
            ...(hasSearchParam && {
                OR: searchArray.map((itm) => ({
                    name: { contains: itm, mode: 'insensitive' },
                })),
            }),
        },
        include: { installations: true },
    });

    return NextResponse.json(software);
}

export async function POST(req: NextRequest) {
    const formData = await req.formData();

    const body = {
        name: formData.get('name') as string,
        developer: formData.get('developer') as string,
        category: formData.get('category') as CATEGORIES,
    };

    const isExisting = await prisma.software.findUnique({
        where: { name: body.name },
    });

    if (isExisting) throw Error('Такая программа уже занесена в бд');

    const software = await prisma.software.create({
        data: {
            ...body,
        },
    });

    return NextResponse.json(software);
}
