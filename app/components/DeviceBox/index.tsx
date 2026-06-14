'use client';
import { Device } from '@/generated/prisma/client';
import { DeviceCard } from '../DeviceCard';
import { useGetDevices } from '@/app/queries/device.api';
import { CardContainer } from '../CardContainer';

export const DeviceBox = () => {
    const { data: devices, isLoading, isError } = useGetDevices();

    const devicesArr = !isLoading && !!devices ? devices : [];

    return (
        <CardContainer isLoading={isLoading || !devices} isError={isError}>
            {devicesArr.map((itm: Device) => (
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
        </CardContainer>
    );
};
