import React, { useState, useEffect } from "react";
import Container from "../components/Container";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import { createGallery, addPhotosToGallery, allGallery } from "./api";
export default function SmallGallery() {
    const [selectedImages, setSelectedImages] = useState([]);
    const [galleryName, setGalleryName] = useState('');
    const [galleryId, setGalleryId] = useState(null);
    const [galleries, setGalleries] = useState([]);

    console.log(galleries);

    const handleImageUpload = event => {
        setSelectedImages([...event.target.files]);
    };

    const handleCreateGallery = async () => {
        if (!galleryName) {
            alert('Proszę podać nazwę galerii.');
            return;
        }

        try {
            const response = await createGallery(galleryName);
            setGalleryId(response.data.newGallery._id); // Ustawienie ID nowej galerii
            alert('Galeria została utworzona. Teraz możesz dodać zdjęcia.');
        } catch (error) {
            console.error(error);
            alert('Wystąpił błąd podczas tworzenia galerii.');
        }
    };

    const handleAddPhotos = async () => {
        if (!galleryId || selectedImages.length === 0) {
            alert('Najpierw utwórz galerię i wybierz zdjęcia.');
            return;
        }

        try {
            await addPhotosToGallery(galleryId, selectedImages);
            console.log(galleryId, "id");
            alert('Zdjęcia zostały dodane do galerii.');
        } catch (error) {
            console.error(error);
            alert('Wystąpił błąd podczas dodawania zdjęć.');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await allGallery(); // Użyj funkcji z pliku api.js do pobrania galerii
                setGalleries(response.data); // Zaktualizuj stan galerii danymi z odpowiedzi
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
            <div>
                <input type="file" multiple onChange={handleImageUpload} />
                <MyButton onClick={handleAddPhotos}>Dodaj zdjęcia</MyButton>
            </div>
            <div>Panel miniaturek zdjęć</div>
            {selectedImages.map((image, index) => (
                <img key={index} src={URL.createObjectURL(image)} alt="Wybrane" style={{ maxWidth: '100px', maxHeight: '100px', margin: '10px' }} />
            ))}

            <div>
                <h2>List of Galleries</h2>
                {galleries.length > 0 ? (
                    <ul>
                        {galleries.map(gallery => (
                          
                            <li key={gallery._id}>
                                <h3>{gallery.gallery.nameGallery}</h3>
                                <p>Photos in this gallery:</p>
                                <ul>
                                    {gallery.gallery.photos.map((photo, index) => (
                                        // Zakładamy, że każde zdjęcie ma pole `photoUrl` z URL-em do obrazka
                                        <li key={index}>
                                            <img src={photo.photoUrl} alt={photo.namePhoto} style={{ maxWidth: '200px', margin: '10px' }} />
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
