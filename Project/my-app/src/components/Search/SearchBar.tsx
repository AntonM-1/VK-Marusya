import styles from "./SearchBar.module.scss"
import IconSearch from "../../assets/icon-search.svg"

const SearchBar = () => {
    return (
        <div className={styles.search}>
            <div className={styles.search__icon}>
                <img src={IconSearch} aria-hidden='true' />
            </div>
            <input
                type="text"
                placeholder="Поиск"
                className={styles.search__input}
            />
        </div>
    )
}

export default SearchBar