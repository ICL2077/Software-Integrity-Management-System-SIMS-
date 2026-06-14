'use client';
import { redirect, useParams } from 'next/navigation';
import CircularProgress from '@mui/material/CircularProgress';
import { useGetSoftwareById } from '../../../queries/software.api';
import React from 'react';

export default function ProgramPage() {
    const { id }: { id: string } = useParams();

    const { data: software, isLoading, isError } = useGetSoftwareById(id);

    if (isLoading || !software)
        return (
            <div className="absolute top-0 bottom-0 left-0 right-0 z-100 bg-gray-300/50 flex justify-center items-center">
                <CircularProgress aria-label="Loading…" />
            </div>
        );

    if (isError) redirect('/devices');

    return (
        <div className="">
            <div className="">Название программы: {software.name}</div>
        </div>
    );
}
