import React from 'react';
import { Text } from '@site/src/components/Atoms/Text';
import clsx from 'clsx';
import { HTMLAttributes } from 'react';

import styles from './styles.module.css';

interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  href?: string;
  size?: 'small' | 'medium' | 'large';
  full?: boolean;
  icon?: React.ReactNode;
  value: string;
  backgroundColor?: string;
  textColor?: "black" | "white" | "primary" | "secondary" | "summary" | "InsideChartColor" | "dashboardColor" | "valueChartColor" | "subheadingColor";
  customWidth?: string;
  weight?: 'medium' | 'normal';
  context?: 'config' | 'wallet';
  disabled?: boolean;
}

const Button = ({
  onClick,
  icon,
  value,
  full = false,
  size = 'large',
  className,
  backgroundColor,
  textColor = 'black',
  customWidth,
  weight = 'normal',
  context,
  disabled = false,
  ...restProps
}: IButtonProps) => {
  const buttonStyle = {
    backgroundColor,
    color: textColor,
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
  };

  const renderedButton = (
    <button
      onClick={onClick}
      className={clsx(
        styles.button,
        styles[size],
        styles.full && full,
        className,
        { [styles.configButton]: context === 'config' },
        { [styles.mobileWalletButton]: context === 'wallet' }
      )}
      style={buttonStyle}
      disabled={disabled}
      {...restProps}
    >
      {icon && <div className={styles.buttonIcon}>{icon}</div>}
      <Text
        variant={size === 'large' ? 'body' : 'smallBody'}
        color={textColor}
        weight={weight}
        lineHeight="normalLineHeight"
        letterSpacing="letterSpacing"
      >
        {value}
      </Text>
    </button>
  );

  return renderedButton;
};

export default Button;
