import React, { useState, useEffect } from "react";
import styles from "../styles/stylesComponents/Menu.module.scss";
import { FiAlignRight, FiXSquare } from "react-icons/fi";
import Container from "../components/Container";
import { useTranslation } from "react-i18next";
import MyLink from "../components/MyLink";
/* image */
import Nederlanden from "../media/picture/menu/Nederlanden.jpg";
import England from "../media/picture/menu/England.jpg";
import Germany from "../media/picture/menu/Germany.jpg";
import Poland from "../media/picture/menu/Poland.jpg";
import France from "../media/picture/menu/France.jpg";

export default function Menu({ onSelectLangue, activeFlag }) {
    const { t } = useTranslation();
    const [isClose, setClose] = useState('active');
    const [isActive, setActive] = useState("close");
    const [activeLangue, setLangue] = useState();
    const [viewsFlag, setFlag] = useState(false);

    const flags = [
        { country: Poland, alt: "Flag Poland", select: "pl" },
        { country: England, alt: "Flag England", select: "en" },
        { country: Nederlanden, alt: "Flag Nederlanden", select: "nl" },
        { country: France, alt: "Flag France", select: "fr" },
        { country: Germany, alt: "Flag Germany", select: "de" }
    ];

    const toggleMenu = () => {
        setActive(isActive === "active" ? "close" : "active");
        setClose(isClose === "active" ? "close" : "active");
    };

    useEffect(() => {
        if (activeFlag === "pl") {
            setLangue(Poland)
        } else if (activeFlag === "en") {
            setLangue(England)
        } else if (activeFlag === 'nl') {
            setLangue(Nederlanden)
        } else if (activeFlag === "fr") {
            setLangue(France)
        } else {
            setLangue(Germany)
        }
    }, [activeFlag])

    return (
        <Container menu={true}>
            <nav className={styles.mainNav}>
                <div className={styles[isClose]}>
                    <FiAlignRight className={styles.iconMobile} onClick={toggleMenu} />
                </div>
                <div className={styles[isActive]}>
                    <div className={styles.contentOpenMenu}>
                        <div className={styles.closeMobile}>
                            <FiXSquare className={styles.iconMobileClose} onClick={toggleMenu} />
                        </div>
                        {!viewsFlag ? (
                            <ul className={styles.ulList}>
                                <li className={styles.myItem}>
                                    <MyLink to="/company_wep">{t("components.menu.textItem.home")}</MyLink>
                                </li>
                                <li className={styles.myItem}>
                                    <MyLink>{t("components.menu.textItem.aboutUs")}</MyLink>
                                </li>
                                <li className={styles.myItem}>
                                    <MyLink>{t("components.menu.textItem.portfolio")}</MyLink>
                                </li>
                                <li className={styles.myItem}>
                                    <MyLink>{t("components.menu.textItem.contact")}</MyLink>
                                </li>
                                <li className={styles.myItem}>
                                    <MyLink to="/company_wep/administration" >{t("components.menu.textItem.administrationPanel")}</MyLink>
                                </li>
                                <li className={styles.myItem}>
                                    <img onClick={() => setFlag(true)} className={styles.flagCountry} src={activeLangue} alt="Active Flag" />
                                </li>
                            </ul>
                        ) : (
                            <div className={styles.flagsContainer}>
                                {flags.map((flag, index) => (
                                    <img
                                        key={index}
                                        className={styles.flagCountry}
                                        src={flag.country}
                                        alt={flag.alt}
                                        onClick={() => {
                                            setLangue(flag.country);
                                            setFlag(false);
                                            onSelectLangue(flag.select);
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </Container>
    );
};
