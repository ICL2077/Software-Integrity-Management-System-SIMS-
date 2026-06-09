import styles from "./styles.module.scss";

export default function Header() {
  return (
    <div className={styles.container}>
      <img src="../../../SIMS.svg" alt="simsIcon" />
      <form action="" className={styles.search}>
        <input className={styles.searchInput} type="text" placeholder="Поиск" />

        <button className={styles.searchButton}>
          <svg
            className={styles.searchIcon}
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}
