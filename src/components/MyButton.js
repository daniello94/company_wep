import React from "react";
import styles from "../styles/stylesComponents/MyButton.module.scss";
const MyButton = (props) => {
    const baseClasses = [
        styles.button,
        props.centerLarge ? styles.centerLarge : null,
        props.stylesLink ? styles.buttonMenu : null,
        props.active ? styles.clickButton : {}
    ]
    const classNames = baseClasses.filter(Boolean).join(' ');
    return (
        <button onClick={props.onClick} className={classNames}>{props.children}</button>
    )

}
export default MyButton;