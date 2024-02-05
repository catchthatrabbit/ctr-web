import styles from './styles.module.css';

interface IKBD {
    children?:string
}

const KBD = ({children}:IKBD) => {

    return(
            <kbd className={styles.kbd}>
                {children}
            </kbd>
    )

}

export default KBD;