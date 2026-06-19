'use client';

import { useEffect, useRef, useState } from 'react';
import ModalOverlay from '../../modalOverlay';
import { useRouter } from 'next/navigation';
import { useClickAway } from 'react-use';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { usePostSoftware } from '@/app/queries/software.api';
import Autocomplete from '@mui/material/Autocomplete';
import { categories } from '@/app/types/categories';
import { CATEGORIES } from '@/generated/prisma/enums';

export default function ProgramCreateModal() {
    const { mutate } = usePostSoftware();

    const [isMounted, setIsMounted] = useState<boolean>(false);

    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);

        return () => {
            setIsMounted(false);
        };
    }, []);

    const clickRef = useRef<HTMLDivElement>(null);

    useClickAway(clickRef, () => {
        return isMounted && router.back();
    });

    const [category, setCategory] = useState<CATEGORIES | null>(null);

    const createSoftware = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        if (category) formData.append('category', category);
        mutate(formData);

        router.back();
    };

    return (
        <ModalOverlay>
            <div
                className={`w-[500px] z-1000 h-fit rounded-2xl transition-all ease-in-out bg-white  ${
                    isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-100'
                }`}>
                <form onSubmit={createSoftware} className="flex flex-col gap-3 p-2 ">
                    <TextField
                        id="name"
                        name="name"
                        label="Название программы"
                        variant="outlined"
                    />
                    <TextField
                        id="developer"
                        name="developer"
                        label="Разработчик"
                        variant="outlined"
                    />
                    <Autocomplete
                        slotProps={{
                            popper: {
                                sx: { zIndex: 9999 },
                            },
                        }}
                        onChange={(_, newValue) => setCategory(newValue?.type ?? null)}
                        renderInput={(params) => <TextField {...params} label="Категория" />}
                        options={categories}
                        getOptionLabel={(option) => option.name}
                        getOptionKey={(option) => {
                            return option.type;
                        }}
                    />

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
