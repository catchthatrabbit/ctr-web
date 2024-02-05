import { ToastContainer, toast } from 'react-toastify';
import { Text } from "@site/src/components/Atoms/Text";
import {generateIBan} from "@site/src/utils/generateIBan";
import styles from "./styles.module.css";
import { Button } from "@site/src/components/Atoms/Button";
import { Copy } from "@site/src/icons";
import { Spacer } from "@site/src/components/Atoms/Spacer";
import 'react-toastify/dist/ReactToastify.css';


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
            <ToastContainer />
            <Text className={styles.iban} variant="primary" size="lg" position="center">
                {generateIBan(iBan)}
            </Text>
            <Spacer direction="horizontal" />
            <Button onClick={handleCopy} size="small" value="Copy" icon={<Copy />} />
        </div>
    )

}

export default IBan;