import React from "react";
import styles from "../styles/stylesComponents/MyText.module.scss";

const MyText = (props) => {
    const baseClasses = [
        styles.text,
        props.questionDelateGallery ? styles.galleryDelete : null
    ]
    const className = baseClasses.filter(Boolean).join(" ");
    return (
        <p className={className}>{props.children}</p>
    )
}
export default MyText;