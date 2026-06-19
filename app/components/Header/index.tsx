'use client';
import { useRef, useState } from 'react';
import { useClickAway, useDebounce } from 'react-use';
import styles from './styles.module.scss';
import { HeaderPopup } from './HeaderPopup';
import { SearchPopup } from './SearchPopup';
import { HeaderSearchInput } from './HeaderSearchInput';
import { useGetSoftware } from '@/app/queries/software.api';
import { useGetDevices } from '@/app/queries/device.api';

export default function Header() {
    const [openPopup, setOpenPopup] = useState<boolean>(false);
    const [openInputPopup, setOpenInputPopup] = useState<boolean>(false);

    const [searchParam, setSearchParam] = useState<string>('');
    const [debouncedValue, setDebouncedValue] = useState<string>('');

    useDebounce(
        () => {
            setDebouncedValue(searchParam);
        },
        500,
        [searchParam],
    );

    const { data: software, isLoading: softwareLoad } = useGetSoftware(debouncedValue);
    const { data: devices, isLoading: devicesLoad } = useGetDevices(debouncedValue);

    console.log(software, 'software');
    console.log(devices, 'device');

    const searchedStuff = [
        {
            id: 1,
            category: 'Программы',
            link: '/programs/',
            items: [...(software ?? [])],
        },
        {
            id: 2,
            category: 'Девайсы',
            link: '/device/',
            items: [...(devices ?? [])],
        },
    ];

    const createPopupRef = useRef<HTMLDivElement>(null);
    const inputPopupRef = useRef<HTMLDivElement>(null);

    useClickAway(createPopupRef, () => {
        setOpenPopup(false);
    });

    useClickAway(inputPopupRef, () => {
        setOpenInputPopup(false);
    });

    return (
        <div className={styles.container}>
            <button className={styles.iconContainer}>
                <img src="/SIMS.svg" alt="simsIcon" />
            </button>

            <div className="flex flex-row items-center gap-2">
                <div className="flex flex-row items-center justify-center gap-1 relative">
                    <div
                        ref={createPopupRef}
                        className="flex flex-col justify-center items-center ">
                        <button
                            onClick={() => setOpenPopup(!openPopup)}
                            className={styles.notificationButton}>
                            <p className="bg-black p-3 rounded-2xl">Добавить +</p>
                        </button>
                        <HeaderPopup
                            openPopup={openPopup}
                            openPopupFunc={() => setOpenPopup(false)}
                        />
                    </div>
                </div>

                <div ref={inputPopupRef} className="flex flex-col items-center justify-center">
                    <HeaderSearchInput
                        value={searchParam}
                        onChange={(e) => setSearchParam(e)}
                        onClickFunc={() => setOpenInputPopup(!openInputPopup)}
                    />

                    <SearchPopup
                        itms={searchedStuff}
                        openPopup={openInputPopup}
                        openPopupFunc={() => setOpenInputPopup(false)}
                    />
                </div>
            </div>
        </div>
    );
}
