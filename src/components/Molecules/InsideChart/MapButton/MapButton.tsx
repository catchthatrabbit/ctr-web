import { Button } from "@site/src/components/Atoms/Button";
import MapCircle from "./MapCircle";
import styles from './styles.module.css';
import Link from "@docusaurus/Link";

interface IMapButton {
    value?:string
    href?:string
}

const MapButton = ({value, href}:IMapButton) => {

    return(
        <div className={styles.mapButton}>
            <MapCircle />
            <Link to={href}>
                <Button className={styles.button} value={value} />
            </Link>
        </div>
    )

}

export default MapButton;