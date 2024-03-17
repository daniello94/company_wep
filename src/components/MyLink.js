import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/stylesComponents/MyButton.module.scss";
const MyLink = (props) => {
    const baseClasses = [
        styles.menuLink
    ]
    const classNames = baseClasses.filter(Boolean).join(' ');
    return (
        <Link to={props.to} className={classNames}>{props.children}</Link>
    )

}
export default MyLink;