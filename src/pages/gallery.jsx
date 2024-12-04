import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel } from "react-bootstrap";

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/images");
        setImages(response.data.files);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="container pt-4">
      <h1 className="text-center mb-4">Image Carousel</h1>

      <Carousel>
        {images.length > 0 ? (
          images.map((image) => (
            <Carousel.Item key={image._id}>
              <img
                className="d-block w-100"
                src={`http://localhost:5000/${image.path}`}
                alt={image.name}
              />
              <Carousel.Caption>
                <h3>{image.name}</h3>
                <p>Uploaded on: {new Date(image.uploadTime).toLocaleString()}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))
        ) : (
          <p>No images available.</p>
        )}
      </Carousel>
    </div>
  );
};

export default Gallery;
