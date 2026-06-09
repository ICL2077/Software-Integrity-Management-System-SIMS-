import styles from "./styles.module.scss";

export default function Header() {
  return (
    <div className={styles.container}>
      <button className={styles.iconContainer}>
        <img src="/SIMS.svg" alt="simsIcon" />
      </button>

      <button className={styles.notificationButton}>
        <img src="/bell.svg" alt="Уведомления" />
      </button>
      <form action="" className={styles.search}>
        <input className={styles.searchInput} type="text" placeholder="Поиск" />
        <button className={styles.searchButton}>
          <img src="/search.svg" alt="Поиск" />
        </button>
      </form>
    </div>
  );
}
