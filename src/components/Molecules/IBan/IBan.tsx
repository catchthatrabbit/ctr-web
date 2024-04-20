import { toast } from 'react-toastify';
import { Text } from "@site/src/components/Atoms/Text";
import {generateIBan} from "@site/src/utils/generateIBan";
import styles from "./styles.module.css";
import { Button } from "@site/src/components/Atoms/Button";
import { Copy } from "@site/src/icons";
import clsx from 'clsx';
import { useMediaQueries } from '@site/src/hooks/useMediaQueries';


interface IIBan {
    iBan?: string
}

const IBan = ({iBan = ''}:IIBan) => {

    const {mobile, tablet} = useMediaQueries();

    const handleCopy = () => {
        navigator.clipboard.writeText(iBan);
        notify();
    }

    const notify = () => toast.success("Address copied");

    return (
        <div className={clsx([[styles.iBanRoot, styles.justifyCenter, "flex"]])} >
            <div className='"md-flex-col--12 sm-flex-col--12 xs-flex-col--12"'>
                <Text className={clsx(styles.iBan, {[styles.iBanPaddingBottom]:mobile || tablet})} variant="heading2" color='primary'>
                    {generateIBan(iBan)}
                </Text>
            </div>
            <div className={clsx(["flex md-flex-col--12 sm-flex-col--12 xs-flex-col--12", styles.justifyCenter])}>
                <Button onClick={handleCopy} value="Copy" icon={<Copy />} />
            </div>
        </div>
    )

}

export default IBan;