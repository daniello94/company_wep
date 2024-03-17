import React, { useState, useEffect } from "react";
import styles from "../styles/stylesComponents/MyHeader.module.scss";

export default function MyHeader(props) {
    const [activeColor, setColor] = useState('');

    useEffect(() => {
        if (props.color) {
            setColor(props.color)
        }
    }, [props.color])
    const baseClasses = [
        styles.header,
        props.color ? styles[activeColor] : null
    ]
    const className = baseClasses.filter(Boolean).join(' ');
    return (
        <h1 className={className}>{props.children}</h1>
    )
}
