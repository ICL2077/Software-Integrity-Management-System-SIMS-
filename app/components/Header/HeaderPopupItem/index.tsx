import Link from 'next/link';
import styles from './styles.module.css';
import { memo } from 'react';

const HeaderPopupItem = memo(
    ({
        text,
        imgUrl,
        link,
        isLast = false,
    }: {
        text: string;
        imgUrl?: string;
        link?: string;
        isLast?: boolean;
    }) => {
        return (
            <Link
                className={`${styles.container} text-black ${
                    isLast ? '' : 'border-b-2 border-black'
                }`}
                href={link ? link : ''}>
                <div className="flex flex-row gap-1 items-center">
                    {imgUrl && <img height={32} width={32} src={imgUrl} alt="img" />}
                    {text}
                </div>
            </Link>
        );
    },
);

HeaderPopupItem.displayName = 'HeaderPopupItem';

export { HeaderPopupItem };
