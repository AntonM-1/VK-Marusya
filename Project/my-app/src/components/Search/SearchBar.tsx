import styles from "./SearchBar.module.scss"
import IconSearch from "../../assets/icon-search.svg?react"


const SearchBar = () => {
    return (
        <div className={styles.search}>
            <IconSearch className={styles.search__icon} />
            <input
                type="text"
                placeholder="Поиск"
                className={styles.search__input}
            />
        </div>
    )
}

export default SearchBar