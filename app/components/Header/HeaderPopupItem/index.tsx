import styles from './styles.module.css';

export const HeaderPopupItem = ({ text, isLast = false }: { text: string; isLast?: boolean }) => {
    return (
        <div
            className={`${styles.container} text-black ${isLast ? '' : 'border-b-2 border-black'}`}>
            {text}
        </div>
    );
};
