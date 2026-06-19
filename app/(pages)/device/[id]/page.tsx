'use client';
import { useGetDeviceById } from '@/app/queries/device.api';
import { redirect, useParams } from 'next/navigation';
import CircularProgress from '@mui/material/CircularProgress';

export default function DevicePage() {
    const { id }: { id: string } = useParams();

    const { data: event, isLoading, isError } = useGetDeviceById(id);

    if (isLoading || !event)
        return (
            <div className="absolute top-0 bottom-0 left-0 right-0 z-100 bg-gray-300/50 flex justify-center items-center">
                <CircularProgress aria-label="Loading…" />
            </div>
        );

    if (isError) redirect('/devices');

    return (
        <div className="">
            <div className="">Device: {event.hostname}</div>
            <div className="">Операционная система: {event.os}</div>
            <div className="">Отдел: {event.department}</div>
            <div className="">Работник: {event.user}</div>
            <span>Установленное ПО:</span>
            <div className="">
                {event.installations.map((itm: any) => {
                    return (
                        <p key={itm.id}>
                            {itm.software.name} | {itm.software.developer} | {itm.software.version}{' '}
                        </p>
                    );
                })}
            </div>
        </div>
    );
}
