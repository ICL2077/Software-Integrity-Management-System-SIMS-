'use client';

import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export const CardContainer = ({
    children,
    isLoading,
    isError,
}: {
    children: React.ReactNode;
    isLoading?: boolean;
    isError?: boolean;
}) => {
    if (isLoading)
        return (
            <div className="absolute top-0 bottom-0 left-0 right-0 z-100 bg-gray-300/50 flex justify-center items-center">
                <CircularProgress aria-label="Loading…" />
            </div>
        );

    if (isError) return <h1>Ошибка</h1>;

    return (
        <div className="overflow-auto h-full flex justify-center ">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 py-3">
                {children}
            </div>
        </div>
    );
};
