import Link from "@docusaurus/Link";
import { Text } from "@site/src/components/Atoms/Text";
import styles from './styles.module.css';
import clsx from "clsx";
import { HTMLAttributes } from "react";

interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
    onClick?: () => void
    href?: string
    variant?: 'outline' | 'transparent' | 'email'
    size?: 'small' | 'medium' | 'large'
    full?: boolean
    icon?: React.ReactNode;
    value: string
  }
  
  const Button = ({ onClick, icon, value, href, variant = 'outline', full = false, size, className,...restProps }: IButtonProps) => {
    const renderedButton = (
      <button onClick={onClick} className={clsx(styles.button, styles[variant], styles[size], styles.full && full, className)} {...restProps} >
        <div className={styles.buttonIcon}>{icon}</div>
        <Text size={variant === 'email' ? 'md' : 'sm'} variant="normal">
          {value}
        </Text>
      </button>
    )
    if (variant === 'email') {
      return <Link href={'mailto:' + value} className="buttonlink">{renderedButton}</Link>
    }
    if (href) {
      return <Link href={href} className="buttonlink">{renderedButton}</Link>
    }
    return renderedButton
  }
  
  export default Button