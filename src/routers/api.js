import axios from "axios";

const API_URL = "https://ventiltion-94d328b29b99-b913714c385c.herokuapp.com/"/* "http://127.0.0.1:8080/" */;

export const createGallery = (nameGallery) => {
    return axios.post(`${API_URL}createGallery`, { nameGallery });
};

export const addPhotosToGallery = (galleryId, photos) => {
    const formData = new FormData();
    photos.forEach(photo => {
        formData.append('photos', photo);
    });

    return axios.post(`${API_URL}addPhotos/${galleryId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const allGallery = () => {
    return axios.get(`${API_URL}galleries`);
};

export const oneGallery = (galleryId) => {
    return axios.get(`${API_URL}gallery/${galleryId}`)
};

export const editFlag = (galleryId, photoId) => {
    return axios.patch(`${API_URL}galleries/${galleryId}/photos/${photoId}/toggleSmall`)
};

export const delatePhoto = (galleryId, photoId) => {
    return axios.delete(`${API_URL}galleries/${galleryId}/photos/${photoId}`)
};

export const deleteGallery = (galleryId) => {
    return axios.delete(`${API_URL}galleries/${galleryId}`)
};

export const smallGallery = () => {
    return axios.get(`${API_URL}findSmallGalleryPhotos`)
};
