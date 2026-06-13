'use client';
import { useGetDeviceById } from '@/app/queries/device.api';
import { useParams } from 'next/navigation';

export default function DevicePage() {
    const { id }: { id: string } = useParams();

    const { data: event, isLoading, isError } = useGetDeviceById(id);

    if (isLoading || !event) return <h1>Загрузка...</h1>;
    if (isError) return <h1>Ошибка...</h1>;

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
