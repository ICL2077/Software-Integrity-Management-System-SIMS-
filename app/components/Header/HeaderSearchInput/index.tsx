import { memo, useState } from 'react';

import styles from './styles.module.scss';

const HeaderSearchInput = memo(
    ({
        onClickFunc,
        onChange,
        value,
    }: {
        onClickFunc?: () => void;
        onChange: (string: string) => void;
        value: string;
    }) => {
        return (
            <div onClick={onClickFunc} className={styles.search}>
                <input
                    className={styles.searchInput}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    type="text"
                    placeholder="Поиск"
                />
                <button className={styles.searchButton}>
                    <img src="/search.svg" alt="Поиск" />
                </button>
            </div>
        );
    },
);

HeaderSearchInput.displayName = 'HeaderInput';

export { HeaderSearchInput };
