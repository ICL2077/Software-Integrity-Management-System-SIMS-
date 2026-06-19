'use client';
import { redirect, useParams } from 'next/navigation';
import CircularProgress from '@mui/material/CircularProgress';
import { useGetSoftwareById } from '../../../queries/software.api';
import { DeviceCard } from '@/app/components/DeviceCard';

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

    console.log(software);

    return (
        <div className="">
            <div className="">Название программы: {software.name}</div>
            <div className="flex flex-col gap-1">
                <h1>Компьютеры на которые установленна программа:</h1>
                <div className="flex flex-row flex-wrap gap-1 w-full h-full">
                    {software.installations.map((itm) => {
                        const device = itm.device;

                        return (
                            <DeviceCard
                                id={device.id}
                                key={device.id}
                                os={device.os}
                                hostname={device.hostname}
                                user={device.user}
                                department={device.department}
                                ipAddress={device.ipAddress}
                                width={250}
                                height={500}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
