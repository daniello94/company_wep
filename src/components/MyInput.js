import React from "react";
import styles from "../styles/stylesComponents/MyInput.module.scss";
const MyInput = (props) => {
    const baseClasses = [
        styles.input,
        props.error ? styles.errorInput : null
    ]
    const classNames = baseClasses.filter(Boolean).join(' ');
    return (
        <input
            className={classNames}
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
            type={props.type}
        />
    )
}
export default MyInput;