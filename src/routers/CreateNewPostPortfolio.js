import React, { useState, useEffect } from "react";
import styles from "../styles/stylesComponents/Portfolio.module.scss";
import style from "../styles/stylesComponents/MyInput.module.scss";
import Container from "../components/Container";
import { createPortfolio, allGallery } from "./api";
import MyInput from "../components/MyInput";
import MyButton from "../components/MyButton";
import CustomCKEditor from "./CustomCKEditor";
import CreateGallery from "./CreateGallery";

export default function CreateNewPostPortfolio() {
    const [gallery, setGallery] = useState([]);
    const [namePost, setNamePost] = useState("");
    const [pl, setPl] = useState("");
    const [en, setEn] = useState("");
    const [de, setDe] = useState("");
    const [nl, setNl] = useState("");
    const [fr, setFr] = useState("");
    const [idGallery, setIdGallery] = useState("");
    const [errorName, setErrorName] = useState(false);
    const [errorSelect, setErrorSelect] = useState("input");
    const [viewsComponents, setViewsComponents] = useState(true);
    const galleryDowland = async () => {
        try {
            const response = await allGallery()
            setGallery(response.data)
        } catch (error) {
            console.error(error);
        }
    };
    const createNewPost = async (e) => {
        e.preventDefault();
        if (!namePost || idGallery === "") {
            console.log("bąłd ");
        } else {
            const portfolioData = {
                namePortfolio: namePost,
                text: {
                    pl: pl,
                    en: en,
                    de: de,
                    nl: nl,
                    fr: fr,
                },
                galleryId: idGallery,
            };
            try {
                await createPortfolio(portfolioData);
                alert('Post został pomyślnie utworzony.');
                setNamePost("");
                setPl("");
                setEn("");
                setDe("");
                setNl("");
                setFr("");
                setIdGallery("none");
                setErrorName(false);
                setErrorSelect("input");
            } catch (error) {
                console.error('Błąd podczas tworzenia posta:', error);
                alert('Nie udało się utworzyć posta.');
            }
        }
    }
    useEffect(() => {
        galleryDowland();
    }, [idGallery]);

    return (
        <Container>
            {viewsComponents ? (
                <Container>
                    <form className={styles.formAddPost}>
                        <h2>Nowe Portfolio</h2>
                        <MyInput
                            error={errorName}
                            name="name"
                            type="text"
                            value={namePost}
                            placeholder="Podaj nazwę projektu"
                            onChange={(e) => {
                                setNamePost(e.target.value)
                                if (e.target.value.length === 0) {
                                    setErrorName(true)
                                } else {
                                    setErrorName(false)
                                }
                            }}
                        />
                        <label className={style.fromLabel}>
                            <p>Galeria zdjeć</p>
                            <MyButton onClick={(e) => {
                                setViewsComponents(false)
                                e.preventDefault()
                            }} btnTable={true}>Dodaj nową galerię</MyButton>
                            <select className={style[errorSelect]}
                                value={idGallery}
                                onChange={(e) => {
                                    setIdGallery(e.target.value);
                                    setErrorSelect(e.target.value === "" ? "errorInput" : "input");
                                }}>
                                <option value="">Wybierz istniejącą galerię</option>
                                {gallery.map((image) => (
                                    <option key={image._id} value={image._id}>{image.gallery?.nameGallery || 'Brak nazwy'}</option>
                                ))}
                            </select>
                        </label>
                        <h5>Opis</h5>
                        <label className={style.fromLabel}>
                            <p>Polski</p>
                            <CustomCKEditor
                                data={pl || ""}
                                onChange={(newContent) => setPl(newContent)}
                            />
                        </label>

                        <label className={style.fromLabel}>
                            <p>Angielski</p>
                            <CustomCKEditor
                                data={en || ""}
                                onChange={(newContent) => setEn(newContent)}
                            />
                        </label>

                        <label className={style.fromLabel}>
                            <p>Niderlandzki</p>
                            <CustomCKEditor
                                data={nl || ""}
                                onChange={(newContent) => setNl(newContent)}
                            />
                        </label>

                        <label className={style.fromLabel}>
                            <p>Francuzki</p>
                            <CustomCKEditor
                                data={fr || ""}
                                onChange={(newContent) => setFr(newContent)}
                            />
                        </label>

                        <label className={style.fromLabel}>
                            <p>Niemiecki</p>
                            <CustomCKEditor
                                data={de || ""}
                                onChange={(newContent) => setDe(newContent)}
                            />
                        </label>
                        <MyButton btnGallery={true} onClick={createNewPost}>Utwórz wpis</MyButton>
                    </form>
                </Container>
            ) : (
                <Container>
                    <CreateGallery setIdNewGallery={setIdGallery} />
                    <MyButton btnGallery={true} onClick={() => setViewsComponents(true)}>wróć</MyButton>
                </Container>
            )}

        </Container>
    )
}