import PageButton from '../PageButton';
import styles from './styles.module.css';

export default function Aside() {
    return (
        <div className={styles.containder}>
            <PageButton href="/programs" src="../../../ui-icons/terminal.svg" text="Программы" />
            <PageButton
                href="/devices"
                src="../../../ui-icons/laptop_chromebook.svg"
                text="Устройства"
            />
            <PageButton
                href="/dashboard"
                src="../../../ui-icons/bar_chart_4_bars.svg"
                text="Статистика"
            />
        </div>
    );
}
