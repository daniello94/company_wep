import React, { useState } from "react";
import Container from "../components/Container";
import MyInput from "../components/MyInput";
import MyButton from "../components/MyButton";
import { createGallery, addPhotosToGallery } from "./api";
import { useTranslation } from "react-i18next";

export default function CreateGallery(props) {
    const [nameGallery, setNameGallery] = useState("");
    const [errorNameGallery, setErrorNameGallery] = useState(false);
    const [viewsAddImage, setImage] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [galleryId, setGalleryId] = useState(null);
    const { t } = useTranslation();
    const createNewGallery = async () => {
        try {
            const response = await createGallery(nameGallery)
            setImage(true);
            setGalleryId(response.data.newGallery._id)
            alert(t('components.gallery.textAlert.cornetCreate'));
        } catch (error) {
            console.error(error);
        }
    }
    const handleImageUpload = event => {
        setSelectedImages([...event.target.files]);
    };

    const validateNameGallery = () => {
        if (errorNameGallery || nameGallery.length === 0) {
            console.log("dodaj nazweę");
        } else {
            createNewGallery()
        }
    }

    const handleAddPhotos = async () => {
        if (!galleryId || selectedImages.length === 0) {
            alert(t('components.gallery.textAlert.errorAddPhoto'));
            return;
        }
        try {
            await addPhotosToGallery(galleryId, selectedImages);
            alert(t('components.gallery.textAlert.correctAddPhoto'));
            setSelectedImages([])
            props.setIdNewGallery(galleryId)
        } catch (error) {
            console.error(error);
            alert(t('components.gallery.textAlert.errorAddImage'));
        }
    };
    return (
        <Container>
            <h2>Nowa galeria</h2>
            <form>
                {!viewsAddImage ? (
                    <>
                        <MyInput
                            error={errorNameGallery}
                            value={nameGallery || ''}
                            type="text"
                            onChange={(e) => {
                                setNameGallery(e.target.value)
                                if (e.target.value.length === 0) {
                                    setErrorNameGallery(true)
                                } else {
                                    setErrorNameGallery(false)
                                }
                            }}
                            placeholder="Nazwa galeri" />
                        <MyButton onClick={(e) => {
                            e.preventDefault()
                            validateNameGallery()
                        }} btnTable={true}>Dodaj nazwę</MyButton>
                    </>

                ) : (
                    <>
                        <input type="file" multiple onChange={handleImageUpload} />
                        <div className="as">
                            {selectedImages.map((image, index) => (
                                <img key={index} src={URL.createObjectURL(image)} alt="thisPhoto" style={{ maxWidth: '100px', maxHeight: '100px', margin: '10px' }} />
                            ))}
                        </div>
                        <MyButton btnTable={true} onClick={(e) => {
                            e.preventDefault()
                            handleAddPhotos()
                        }}> Dodaj</MyButton>
                    </>
                )}
            </form>
        </Container>
    )
}