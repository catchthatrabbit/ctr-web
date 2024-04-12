import { Magnifier } from '@site/src/icons';
import styles from './styles.module.css';
import { InputHTMLAttributes, forwardRef, useRef } from 'react';
import { InputText } from '@site/src/components/Atoms/InputText';
import clsx from 'clsx';

interface ISearch {
    onSearch?: (searchQuery:string) => void
}

const Search = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & ISearch>(({onSearch, ...restProps}, ref) => {

    const inputRef = useRef<HTMLInputElement>();

    const handleClickSearchButton = () => {
        handleSearch();
    }

    const handleSearch = () => {
        if(typeof onSearch === "function")
            onSearch(inputRef.current.value);
    }

    return (
        <div className={clsx("row", styles.search)}>
            <InputText className={styles.searchInput} 
            placeholder='Search by wallet address...' ref={ref || inputRef} onPressEnter={handleSearch} {...restProps} />
            <button className={styles.searchButton} onClick={handleClickSearchButton}>
                <Magnifier />
            </button>
        </div>
    )

})

export default Search;