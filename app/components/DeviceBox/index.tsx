'use client';
import { Device } from '@/generated/prisma/client';
import { DeviceCard } from '../DeviceCard';
import { useGetDevices } from '@/app/queries/device.api';

export const DeviceBox = () => {
    const { data: devices, isLoading, isError } = useGetDevices();

    if (isLoading || !devices) return <h1>Загрузка...</h1>;

    if (isError) return <h1>Ошибка</h1>;

    return (
        <div className="overflow-auto h-full flex justify-center ">
            <div className="grid grid-cols-3 gap-5 py-3">
                {devices.map((itm: Device) => (
                    <DeviceCard
                        id={itm.id}
                        key={itm.id}
                        os={itm.os}
                        hostname={itm.hostname}
                        user={itm.user}
                        department={itm.department}
                        ipAddress={itm.ipAddress}
                    />
                ))}
            </div>
        </div>
    );
};
