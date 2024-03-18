import React from "react";
import styles from "../styles/stylesComponents/Container.module.scss";

const Container = React.forwardRef((props, ref) => {
    const baseClasses = [
        styles.container,
        props.menu ? styles.menuContainer : null,
        props.header ? styles.headerContainer : null,
        props.black ? styles.blackBlok : null,
        props.textContext ? styles.textContext : null,
        props.administration ? styles.administrationContainer : null,
        props.blok_row ? styles.containerBlokRow : null,
        props.galleryViews ? styles.containerGallery : null
    ]
    const classNames = baseClasses.filter(Boolean).join(' ');
    return (
        <div ref={ref} className={classNames}>
            {props.children}
        </div>
    )
});
export default Container;