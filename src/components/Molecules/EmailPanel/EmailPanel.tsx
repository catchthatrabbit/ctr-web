import { Panel } from "@site/src/components/Molecules/Panel";
import { Text } from "@site/src/components/Atoms/Text";
import { Button } from "@site/src/components/Atoms/Button";
// eslint-disable-next-line import/no-unresolved
import Link from "@docusaurus/Link";
import { Spacer } from "@site/src/components/Atoms/Spacer";
import { useMediaQueries } from "@site/src/hooks/useMediaQueries";
import clsx from "clsx";

import styles from "./styles.module.css";

interface IEmailPanel {
  title?: string;
  text?: string;
  emailAddress?: string;
}

const EmailPanel = ({ title, text, emailAddress }: IEmailPanel) => {
  const { desktop, laptop, tablet, mobile } = useMediaQueries();

  return (
    <Panel title={title}>
      <div
        className={clsx({
          [styles.emailValueDesktop]: desktop || laptop,
          [styles.emailValueTablet]: tablet,
          [styles.emailValueMobile]: mobile,
        })}
      >
        <Text variant="body" type="value">
          {text}
        </Text>
        <Spacer variant="lg" />
        <Link to={`mailto:${emailAddress}`}>
          <Button value={emailAddress} size="large" />
        </Link>
      </div>
    </Panel>
  );
};

export default EmailPanel;
