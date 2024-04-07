import React, { useState, useEffect } from "react";
import { getAllPortfolios } from "./api";
import styles from "../styles/stylesComponents/Portfolio.module.scss";
import CreateNewPostPortfolio from "./CreateNewPostPortfolio";
import Container from "../components/Container";
import MyButton from "../components/MyButton";
import { FiXSquare } from "react-icons/fi";
export default function Portfolio() {
    const [allPost, setAllPost] = useState([]);
    const [viewsContentPortfolio, setContent] = useState("");

    const allGetPortfolio = async () => {
        try {
            const response = await getAllPortfolios()
            setAllPost(response.data)
        } catch (error) {
            console.error("There was an error fetching the portfolios:", error);
        }
    };

    useEffect(() => {
        allGetPortfolio()
    }, []);
    return (
        <Container>
            {viewsContentPortfolio === "" ? (
                <Container>
                    <div className={styles.btnStylesPortfolio}>
                        <MyButton onClick={() => setContent("ceratePost")}>Dodaj Wpis</MyButton>
                    </div>
                    <div className={styles.contentPortfolio}>
                        <table className={styles.tablePortfolio}>
                            <thead>
                                <tr>
                                    <td>Nazwa</td>
                                    <td>Akcja </td>
                                </tr>
                            </thead>
                            <tbody>
                                {allPost.map((portfolio) => {
                                    return (
                                        <tr key={portfolio._id}>
                                            <td>{portfolio.namePortfolio}</td>
                                            <td className={styles.tdBtn}>
                                                <MyButton btnTable={true}>Więcej</MyButton>
                                                <MyButton btnTable={true}>Galeria</MyButton>
                                                <MyButton btnTable={true}>Usuń Wpis</MyButton>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>

                        </table>
                    </div>
                </Container>
            ) : (
                <FiXSquare onClick={() => {
                    setContent("")
                    allGetPortfolio()
                }} className={styles.iconCloseViews} />
            )}

            {viewsContentPortfolio === "ceratePost" && (
                <Container>
                    <CreateNewPostPortfolio />
                </Container>
            )}
        </Container>

    )
}