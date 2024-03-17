import React, { useState, useEffect } from "react";
import Container from "../components/Container";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import styles from "../styles/stylesComponents/SmallGallery.module.scss";
import { createGallery, addPhotosToGallery, allGallery } from "./api";
export default function SmallGallery() {
    const [selectedImages, setSelectedImages] = useState([]);
    const [galleryName, setGalleryName] = useState('');
    const [galleryId, setGalleryId] = useState(null);
    const [galleries, setGalleries] = useState([]);
    const [cerateGallery, setCreateGallery] = useState(false);
    const [isActive, setActive] = useState("")
    console.log(isActive);

    const handleImageUpload = event => {
        setSelectedImages([...event.target.files]);
    };

    const refreshGalleries = async () => {
        try {
            const response = await allGallery();
            setGalleries(response.data);
        } catch (error) {
            console.error("There was an error fetching the galleries:", error);
        }
    };
    const handleCreateGallery = async () => {
        if (!galleryName) {
            alert('Proszę podać nazwę galerii.');
            return;
        }

        try {
            const response = await createGallery(galleryName);
            setGalleryId(response.data.newGallery._id);
            alert('Galeria została utworzona. Teraz możesz dodać zdjęcia.');
        } catch (error) {
            console.error(error);
            alert('Wystąpił błąd podczas tworzenia galerii.');
        }
        setCreateGallery(true)
    };

    const handleAddPhotos = async () => {
        if (!galleryId || selectedImages.length === 0) {
            alert('Najpierw utwórz galerię i wybierz zdjęcia.');
            return;
        }

        try {
            await addPhotosToGallery(galleryId, selectedImages);
            setCreateGallery(false)
            alert('Zdjęcia zostały dodane do galerii.');
            setSelectedImages([])
            await refreshGalleries()
        } catch (error) {
            console.error(error);
            alert('Wystąpił błąd podczas dodawania zdjęć.');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await allGallery();
                setGalleries(response.data);
            } catch (error) {
                console.error("There was an error fetching the galleries:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <Container>
            <MyHeader color={'red'}>Galeria zdjęć Portfolio</MyHeader>
            <input
                type="text"
                placeholder="Nazwa galerii"
                value={galleryName}
                onChange={(e) => setGalleryName(e.target.value)}
            />
            <MyButton onClick={handleCreateGallery}>Utwórz galerię</MyButton>
            {cerateGallery && (
                <div>
                    <input type="file" multiple onChange={handleImageUpload} />
                    {selectedImages.length > 0 && (
                        <MyButton onClick={handleAddPhotos}>Dodaj zdjęcia</MyButton>
                    )}
                </div>
            )}
            <div>Panel miniaturek zdjęć</div>
            {selectedImages.map((image, index) => (
                <img key={index} src={URL.createObjectURL(image)} alt="Wybrane" style={{ maxWidth: '100px', maxHeight: '100px', margin: '10px' }} />
            ))}

            <div className={styles.containerImageGallery}>
                <h2>List of Galleries</h2>
                {galleries.length > 0 ? (
                    <ul>
                        {galleries.map(gallery => (
                            <li key={gallery._id}>
                                <h3>{gallery.gallery.nameGallery}</h3>
                                <p>Photos in this gallery:</p>
                                <ul>
                                    {gallery.gallery.photos.map((photo, index) => (
                                        <li key={index}>
                                            <img className={styles[isActive]} onClick={() => setActive(isActive === "active" ? "disabled" : "active")} src={photo.photoUrl} alt={photo.namePhoto} />
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No galleries found.</p>
                )}
            </div>
        </Container>
    );
}
