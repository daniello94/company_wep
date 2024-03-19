import React, { useEffect, useState } from "react";
import { smallGallery } from "./api";
import Container from "../components/Container";
import styles from "../styles/stylesComponents/GalleryHeader.module.scss";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


export default function GalleryHeader() {
    const [myGallery, setMyGallery] = useState({
        smallGalleryPhotos: []
    });
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 910);
    const centerSlidePercentage = isSmallScreen ? 100 : 30;


    useEffect(() => {
        const setGallery = async () => {
            try {
                const response = await smallGallery();
                setMyGallery(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        setGallery();
    }, []);
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 910);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [])

    return (
        <Container galleryHeader={true}>
            <div>
                <Carousel
                    showThumbs={false}
                    showArrows={true}
                    showIndicators={true}
                    showStatus={true}
                    infiniteLoop={true}
                    centerMode={true}
                    centerSlidePercentage={centerSlidePercentage}
                    emulateTouch={true}
                    autoPlay={true}
                    interval={5000}
                    slidesToShow={3}>
                    {myGallery.smallGalleryPhotos.map((image) => (
                        <div key={image._id}>
                            <img className={styles.carouselImg} src={image.photoUrl} alt={image.namePhoto} />
                        </div>
                    ))}
                </Carousel>
            </div>
        </Container >
    )
}
