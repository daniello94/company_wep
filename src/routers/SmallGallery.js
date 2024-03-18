import React, { useState, useEffect } from "react";

import { createGallery, addPhotosToGallery, allGallery, editFlag, delatePhoto, deleteGallery } from "./api";
import styles from "../styles/stylesComponents/SmallGallery.module.scss";
import Container from "../components/Container";
import { useTranslation } from "react-i18next";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import ViewsGallery from "./ViewsGallery";
import MyText from "../components/MyText";

export default function SmallGallery() {
    const [selectedImages, setSelectedImages] = useState([]);
    const [galleryName, setGalleryName] = useState('');
    const [galleryId, setGalleryId] = useState(null);
    const [galleries, setGalleries] = useState([]);
    const [cerateGallery, setCreateGallery] = useState(false);
    const [isActive, setActive] = useState(false);
    const [newGallery, setNewGallery] = useState(false);
    const [galleryID, setGalleryID] = useState("");
    const [clickImage, setImage] = useState("");
    const { t } = useTranslation();

    const handleImageUpload = event => {
        setSelectedImages([...event.target.files]);
    };
    const fetchData = async () => {
        try {
            const response = await allGallery();
            setGalleries(response.data);
        } catch (error) {
            console.error("There was an error fetching the galleries:", error);
        }
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
            alert(t('components.gallery.textAlert.nameGallery'));
            return;
        }
        try {
            const response = await createGallery(galleryName);
            setGalleryId(response.data.newGallery._id);
            alert(t('components.gallery.textAlert.cornetCreate'));
        } catch (error) {
            console.error(error);
            alert(t('components.gallery.textAlert.errorCreate'));
        }
        setCreateGallery(true)
    };

    const handleAddPhotos = async () => {
        if (!galleryId || selectedImages.length === 0) {
            alert(t('components.gallery.textAlert.errorAddPhoto'));
            return;
        }
        try {
            await addPhotosToGallery(galleryId, selectedImages);
            setCreateGallery(false)
            alert(t('components.gallery.textAlert.correctAddPhoto'));
            setSelectedImages([])
            setNewGallery(false)
            await refreshGalleries()
        } catch (error) {
            console.error(error);
            alert(t('components.gallery.textAlert.errorAddImage'));
        }
    };

    const togglePhotoFlag = async (galleryId, photoId) => {
        try {
            await editFlag(galleryId, photoId);
            fetchData();
        } catch (error) {
            console.error(error);
        }
    };

    const delateImage = async (galleryId, photoId) => {
        try {
            await delatePhoto(galleryId, photoId);
            fetchData();
        } catch (error) {
            console.error(error);
        }
    }
    const galleryDelete = async (galleryId) => {
        try {
            await deleteGallery(galleryId)
            fetchData()
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Container>
            <MyHeader color={'red'}>{t('components.gallery.MyHeader')}</MyHeader>
            <div className={styles.btnContent}>
                <MyButton onClick={() => setNewGallery(true)}>{t('components.gallery.btn.createGallery')}</MyButton>
            </div>
            {newGallery && (
                <div className={styles.createPanelGallery}>
                    {!cerateGallery && (
                        <div>
                            <input
                                type="text"
                                placeholder={t('components.gallery.placeholder')}
                                value={galleryName}
                                onChange={(e) => setGalleryName(e.target.value)}
                            />
                            <MyButton onClick={handleCreateGallery}>{t('components.gallery.btn.nameGallery')}</MyButton>
                        </div>
                    )}
                    {cerateGallery && (
                        <div>
                            <input type="file" multiple onChange={handleImageUpload} />
                            {selectedImages.map((image, index) => (
                                <img key={index} src={URL.createObjectURL(image)} alt="thisPhoto" style={{ maxWidth: '100px', maxHeight: '100px', margin: '10px' }} />
                            ))}
                            {selectedImages.length > 0 && (
                                <MyButton onClick={handleAddPhotos}>{t('components.gallery.btn.addPhotos')}</MyButton>
                            )}
                        </div>
                    )}
                </div>
            )}

            <div className={styles.containerImageGallery}>
                {galleries.length > 0 ? (
                    <ul>
                        {galleries.map(gallery => (
                            <li key={gallery._id}>
                                <h3>{gallery.gallery.nameGallery}</h3>
                                <MyButton onClick={() => {
                                    setNewGallery(true);
                                    setGalleryId(gallery._id)
                                    setCreateGallery(true)
                                }}>Dodaj Zdjecie</MyButton>
                                <MyButton onClick={() => galleryDelete(gallery._id)}>Usuń gakerie</MyButton>
                                <ul>
                                    {gallery.gallery.photos.map((photo, index) => (
                                        <li key={index}>
                                            <img onClick={() => {
                                                setActive(isActive === true ? false : true)
                                                setGalleryID(gallery._id);
                                                setImage(photo.photoUrl)
                                            }} src={photo.photoUrl} alt={photo.namePhoto} />
                                            <div className={styles.btnContent}>
                                                <MyButton onClick={() => {
                                                    togglePhotoFlag(gallery._id, photo._id)
                                                }} btnGallery={true}>{photo.smallGallery ? "-" : "+"}</MyButton>
                                                <MyButton onClick={() => delateImage(gallery._id, photo._id)} btnGallery={true}>Usuń</MyButton>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <MyText>{t('components.gallery.notFoundGallery')}</MyText>
                )}
            </div>
            {isActive && (
                <Container galleryViews={true}  >
                    <ViewsGallery setActive={setActive} galleryID={galleryID} clickImage={clickImage} />
                </Container>
            )}
        </Container>
    );
}
