import { memo } from 'react';
import styles from './styles.module.css';
import Image from 'next/image';
import Link from 'next/link';

const PageButton = memo(({ href, src, text }: { href?: string; src: string; text: string }) => {
    return (
        <Link href={href ?? ''}>
            <div className={styles.container}>
                <div className={`${styles.buttonCore} flex flex-row gap-1`}>
                    <Image width={32} height={32} src={src} alt="btnIcn" />
                    <h1>{text}</h1>
                </div>
            </div>
        </Link>
    );
});

PageButton.displayName = 'PageButton'; // чтобы компонент в Dom дереве корректно отображался не <Memo(Anonymous)> а <Memo(PageButton)>

export default PageButton;
