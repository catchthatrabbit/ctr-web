import { Panel } from "@site/src/components/Molecules/Panel";
import { Text } from "@site/src/components/Atoms/Text";
import { Button } from "@site/src/components/Atoms/Button";
import Link from "@docusaurus/Link";
import { Spacer } from "@site/src/components/Atoms/Spacer";
import styles from './styles.module.css';

interface IEmailPanel {
    title?:string
    text?:string
    emailAddress?:string
}

const EmailPanel = ({title, text, emailAddress}:IEmailPanel) => {

    return <Panel title={title}>
        <div className={styles.emailValue}>
            <Text variant="values" size="sm">
                {text}
            </Text>
            <Spacer variant="large" />
            <Link to={`mailto:${emailAddress}`}>
                <Button value={emailAddress} variant="email" size="large" />
            </Link>
        </div>
    </Panel>

}

export default EmailPanel;