// Plik api.js
import axios from "axios";

const API_URL = "https://ventiltion-94d328b29b99-b913714c385c.herokuapp.com/";

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
}
