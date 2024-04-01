import { Button } from "@site/src/components/Atoms/Button";
import MapCircle from "./MapCircle";
import styles from './styles.module.css';

interface IMapButton {
    value?:string
    href?:string
}

const MapButton = ({value, href}:IMapButton) => {

    return(
        <div className={styles.mapButton}>
            <MapCircle />
            <Button className={styles.button} href={href} value={value} />
        </div>
    )

}

export default MapButton;