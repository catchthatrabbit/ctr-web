import React from 'react';
import styles from './styles.module.css';
import { Spacer } from "@site/src/components/Atoms/Spacer";
import { Text } from "@site/src/components/Atoms/Text";
import clsx from 'clsx';

interface IPanel {
    title?: string
    children?: React.ReactNode
    variant?: "body" | "heading1" | "heading2" | "heading3" | "subheading" | "smallBody" | "tinyBody" | "tag" | "CTA"
    className?:string
}

const Title = ({title="", variant="body", children, className}:IPanel) => {

    return(<>
            <div className={styles.panelTitleBase}>
                <Text variant={variant} className={className}>{title}</Text>
            </div>
            <Spacer />
                {children}
            <Spacer />
        </>
    )
}

export default Title;