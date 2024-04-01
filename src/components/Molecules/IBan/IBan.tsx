import { toast } from 'react-toastify';
import { Text } from "@site/src/components/Atoms/Text";
import {generateIBan} from "@site/src/utils/generateIBan";
import styles from "./styles.module.css";
import { Button } from "@site/src/components/Atoms/Button";
import { Copy } from "@site/src/icons";
import { Spacer } from "@site/src/components/Atoms/Spacer";


interface IIBan {
    iBan?: string
}

const IBan = ({iBan = ''}:IIBan) => {

    const handleCopy = () => {
        navigator.clipboard.writeText(iBan);
        notify();
    }

    const notify = () => toast.success("Address copied");

    return (
        <div className={styles.ibanRoot} >
            <Text className={styles.iban} variant="heading2" color='primary'>
                {generateIBan(iBan)}
            </Text>
            <Button onClick={handleCopy} value="Copy" icon={<Copy />} />
        </div>
    )

}

export default IBan;