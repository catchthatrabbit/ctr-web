import { Magnifier } from '@site/src/icons';
import styles from './styles.module.css';
import { InputHTMLAttributes, forwardRef, useRef } from 'react';
import { InputText } from '@site/src/components/Atoms/InputText';

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
        <div className="container">
            <div className="row">
                <InputText ref={ref || inputRef} onPressEnter={handleSearch} {...restProps} />
                <button className={styles.searchButton} onClick={handleClickSearchButton}>
                    <Magnifier />
                </button>
            </div>
        </div>
    )

})

export default Search;