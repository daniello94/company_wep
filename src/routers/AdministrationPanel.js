import React, { useState } from "react";
import Container from "../components/Container";
import styles from "../styles/stylesComponents/AdministrationPanel.module.scss";
import { BsChevronCompactDown, BsChevronUp } from "react-icons/bs";
import SmallGallery from "../routers/SmallGallery";
import MyLink from "../components/MyLink";
import MyButton from "../components/MyButton";
import { useTranslation } from "react-i18next";
export default function AdministrationPanel() {
    const { t } = useTranslation()
    const [isClose, setClose] = useState('active');
    const [isActive, setActive] = useState('close');
    const [viewsComponents, setComponents] = useState("gallery")


    const toggleMenu = () => {
        setActive(isActive === "active" ? "close" : "active");
        setClose(isClose === "active" ? "close" : "active");
    }
    const toggleMenuIfSmallScreen = () => {
        if (window.innerWidth <= 940) {
            toggleMenu();
        }
    }
    return (
        <Container administration={true}>
            <Container black={true}></Container>
            <Container blok_row={true}>
                <div className={styles.menu}>
                    <nav>
                        <div className={styles[isClose]}>
                            <BsChevronCompactDown className={styles.iconMobile} onClick={toggleMenu} />
                        </div>
                        <div className={styles[isActive]}>
                            <div className={styles.contentOpenMenu}>
                                <div className={styles.closeMobile}>
                                    <BsChevronUp className={styles.iconCloseMobile} onClick={toggleMenu} />
                                </div>
                                <ul className={styles.ulList}>
                                    <li>
                                        <MyLink to="/company_wep">{t("components.menu.textItem.home")}</MyLink>
                                    </li>
                                    <li><MyButton active={viewsComponents === "gallery"} onClick={() => {
                                        setComponents("gallery")
                                        toggleMenuIfSmallScreen()
                                    }} stylesLink={true}>{t('components.administrationPanel.menu.gallery')}</MyButton>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className={styles.viewsContent}>
                    {viewsComponents === "gallery" && (
                        <SmallGallery />
                    )}
                </div>
            </Container>
        </Container>
    )
}