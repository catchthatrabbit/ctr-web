import Link from "@docusaurus/Link";
import { Text } from "@site/src/components/Atoms/Text";
import styles from './styles.module.css';
import clsx from "clsx";
import { HTMLAttributes } from "react";

interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
    onClick?: () => void
    href?: string
    size?: 'small' | 'medium' | 'large'
    full?: boolean
    icon?: React.ReactNode;
    value: string
  }
  
  const Button = ({ onClick, icon, value, href, full = false, size, className,...restProps }: IButtonProps) => {
    const renderedButton = (
      <button onClick={onClick} className={clsx(styles.button, styles.outline, styles[size], styles.full && full, className)} {...restProps} >
        {icon && <div className={styles.buttonIcon}>{icon}</div>}
        <Text variant={size === 'large' ? 'body' : 'smallBody'}>
          {value}
        </Text>
      </button>
    )

    return renderedButton
  }
  
  export default Button