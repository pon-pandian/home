import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/images')
            .then((response) => setImages(response.data))
            .catch((error) => console.error('Failed to fetch images:', error));
    }, []);

    const handleUpload = async (e) => {
        e.preventDefault();
        if (selectedFile) {
            const formData = new FormData();
            formData.append('image', selectedFile);

            try {
                const response = await axios.post('http://localhost:5000/upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                setImages((prev) => [...prev, response.data]);
            } catch (error) {
                console.error('Failed to upload image:', error);
            }
        }
    };

    return (
        <div className="container">
            <h1 className="text-center pt-3 mb-4">Image Carousel</h1>
            
            <form onSubmit={handleUpload}>
                <div className="mb-3">
                    <input
                        type="file"
                        accept="image/*"
                        className="form-control"
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Upload Image
                </button>
            </form>

            {images.length > 0 && (
                <div id="carouselExample" className="carousel slide mt-5" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        {images.map((image, index) => (
                            <div
                                key={image._id}
                                className={`carousel-item ${index === 0 ? 'active' : ''}`}
                            >
                                <img
                                    src={`http://localhost:5000${image.path}`}
                                    className="d-block w-100"
                                    alt={image.filename}
                                    width={"100px"}
                                    height={"100px"}
                                />
                            </div>
                        ))}
                    </div>
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExample"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExample"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default Gallery;
