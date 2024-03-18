import React, { useState, useEffect } from "react";
import styles from "../styles/stylesComponents/ViewsGallery.module.scss";
import Container from "../components/Container";
import { oneGallery } from "../routers/api";
import { FiXSquare } from "react-icons/fi";

export default function ViewsGallery(props) {
    const [viewsGallery, setGallery] = useState({
        nameGallery: '',
        photos: []
    });
    const [activeIMG, setIMG] = useState(props.clickImage);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await oneGallery(props.galleryID);
                if (response.data && response.data.gallery) {
                    setGallery(response.data.gallery);
                } else {
                    setGallery({ nameGallery: '', photos: [] });
                }
            } catch (error) {
                console.error("There was an error fetching the galleries:", error);
                setGallery({ nameGallery: '', photos: [] });
            }
        };
        fetchData();
    }, [props.galleryID]);
    return (
        <Container>
            <FiXSquare className={styles.closedGallery} onClick={() => props.setActive(false)} />
            <div className={styles.contentGallery}>
                <div className={styles.activeImage}>
                    <img src={activeIMG} alt="ViewsPhoto" />
                </div>
                <div className={styles.dataImages}>
                    {Array.isArray(viewsGallery.photos) && viewsGallery.photos.map((image, index) => (
                        <img onClick={() => setIMG(image.photoUrl)} key={index} src={image.photoUrl} alt={image.namePhoto} />
                    ))}
                </div>
            </div>
        </Container>
    );
}
