import React from 'react';
import styles from './styles.module.css';
import { Spacer } from "@site/src/components/Atoms/Spacer";
import { Text } from "@site/src/components/Atoms/Text";
import clsx from 'clsx';

interface IPanel {
    title?: string
    children?: React.ReactNode
    variant?:"menu" | "normal" | "primary" | "primaryLabels" | "values"
    size?:"xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"
    className?:string
}

const Title = ({title="", variant="normal", children, size = 'lg', className}:IPanel) => {

    return(<>
            <div className={styles.panelTitleBase}>
                <Text variant={variant} size={size} className={className}>{title}</Text>
            </div>
            <Spacer />
                {children}
            <Spacer />
        </>
    )
}

export default Title;