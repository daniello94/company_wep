import React from "react";
import { useTranslation } from "react-i18next";
import Container from "../components/Container";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import MyText from "../components/MyText";
import styles from "../styles/stylesComponents/Header.module.scss";
import PictureEmployee from "../media/picture/header/2149235_medium2000.png";
import Logo from "../media/picture/header/logo-removebg-preview.png"
export default function Header() {
    const { t } = useTranslation();
    return (
        <Container header={true}>
            <Container black={true}></Container>
            <img className={styles.logoCompany} src={Logo} alt="To jest Logo" />
            <Container textContext={true}>
                <MyHeader>{t('components.header.headerText')}</MyHeader>
                <MyText>{t('components.header.text')}</MyText>
                <MyButton centerLarge={true}>{t("components.menu.textItem.contact")}</MyButton>
            </Container>
            <img className={styles.imgEmployee} src={PictureEmployee} alt="To jest zdjecie" />
        </Container>
    )
}