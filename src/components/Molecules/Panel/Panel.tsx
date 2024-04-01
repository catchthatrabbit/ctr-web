import React from 'react';
import styles from './styles.module.css';
import { Spacer } from "@site/src/components/Atoms/Spacer";
import { Text } from "@site/src/components/Atoms/Text";
import clsx from 'clsx';

interface IPanel {
    title?: string
    children?: React.ReactNode
    variant?: "body" | "heading1" | "heading2" | "heading3" | "subheading" | "smallBody" | "tinyBody" | "tag" | "CTA"
    color?: "primary" | "white" | "gray"
    titleClassName?:string
    className?:string
}

const Panel = ({title="", variant="heading2", children, titleClassName, className, color}:IPanel) => {

    return(<div className={clsx(styles.panelRoot, className)}>
                <div className={clsx(styles.panelTitleBase, styles.panelTitle)}>
                    <Text color={color} variant={variant} className={titleClassName}>{title}</Text>
                </div>
                <Spacer />
                    {children}
                <Spacer />
            </div>
    )
}

export default Panel;