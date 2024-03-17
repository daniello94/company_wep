import React from "react";
import Header from "./Header";
import Container from "../components/Container";
import Menu from "./Menu";
export default function MainPage(props) {
    return (
        <Container>
            <Menu activeFlag={props.activeFlag} onSelectLangue={props.onSelectLangue} />
            <Header />
        </Container>
    )
}