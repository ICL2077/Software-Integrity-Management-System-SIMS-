'use client';
import { useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import styles from './styles.module.scss';
import { HeaderPopup } from './HeaderPopup';

export default function Header() {
    const [openPopup, setOpenPopup] = useState<boolean>(false);

    const popupRef = useRef<HTMLDivElement>(null);

    useClickAway(popupRef, () => {
        setOpenPopup(false);
    });

    return (
        <div className={styles.container}>
            <button className={styles.iconContainer}>
                <img src="/SIMS.svg" alt="simsIcon" />
            </button>

            <div className="flex flex-row items-center gap-2">
                <div className="flex flex-row items-center justify-center gap-1 relative">
                    <div ref={popupRef} className="flex flex-col justify-center items-center ">
                        <button
                            onClick={() => setOpenPopup(!openPopup)}
                            className={styles.notificationButton}>
                            <p className="bg-black p-3 rounded-2xl">Добавить +</p>
                        </button>
                        <HeaderPopup openPopup={openPopup} />
                    </div>

                    <button className={styles.notificationButton}>
                        <img src="/bell.svg" alt="Уведомления" />
                    </button>
                </div>

                <form action="" className={styles.search}>
                    <input className={styles.searchInput} type="text" placeholder="Поиск" />
                    <button className={styles.searchButton}>
                        <img src="/search.svg" alt="Поиск" />
                    </button>
                </form>
            </div>
        </div>
    );
}
