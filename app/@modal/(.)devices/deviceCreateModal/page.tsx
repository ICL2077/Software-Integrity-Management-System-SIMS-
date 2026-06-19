'use client';

import { useEffect, useRef, useState } from 'react';
import ModalOverlay from '../../modalOverlay';
import { useRouter } from 'next/navigation';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { usePostDevice } from '@/app/queries/device.api';

export default function DevicesModal() {
    const { mutate } = usePostDevice();

    const [isMounted, setIsMounted] = useState<boolean>(false);

    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);

        return () => {
            setIsMounted(false);
        };
    }, []);

    const createDevice = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        mutate(formData);

        router.back();
    };

    return (
        <ModalOverlay>
            <div
                className={`w-[500px] h-fit rounded-2xl transition-all ease-in-out bg-white  ${
                    isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-100'
                }`}>
                <form onSubmit={createDevice} className="flex flex-col gap-3 p-2 ">
                    <TextField
                        id="hostname"
                        required
                        name="hostname"
                        label="Название компьютера"
                        variant="outlined"
                    />
                    <TextField id="os" name="os" label="Операционная система" variant="outlined" />
                    <TextField
                        id="department"
                        name="department"
                        label="Расположение компьютера"
                        variant="outlined"
                    />
                    <TextField id="user" name="user" label="Работник" variant="outlined" />

                    <div className="w-full flex flex-row items-center justify-between mt-4">
                        <Button onClick={() => router.back()} variant="contained" color="error">
                            Отмена
                        </Button>
                        <Button type="submit" variant="contained">
                            Создать
                        </Button>
                    </div>
                </form>
            </div>
        </ModalOverlay>
    );
}
