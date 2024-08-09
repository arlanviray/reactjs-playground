import { useEffect, useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./styles.scss";

function ImageSlider({ url, page = 1, limit = 10 }) {
  const [images, setImages] = useState([]);
  const [currSlide, setCurrSlide] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState(null);

  const getImages = async (getUrl) => {
    try {
      setLoading(true);

      const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
      const data = await response.json();

      if (data) {
        setImages(data);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setErrMessage("An error occurred while fetching data...");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    url !== null && getImages(url);
  }, [url]);

  const handlePrevSlide = () => {
    if (currSlide > 0) {
      setCurrSlide((prevState) => prevState - 1);
    } else {
      setCurrSlide(images.length - 1);
    }
  };

  const handleNextSlide = () => {
    if (currSlide < images.length - 1) {
      setCurrSlide((prevState) => prevState + 1);
    } else {
      setCurrSlide(0);
    }
  };

  return (
    <>
      <div className="image-slider maxwidth mwmedium">
        {(() => {
          if (errMessage) {
            return <div className="center">{errMessage}</div>;
          } else {
            return loading ? (
              <div className="center">Loading...</div>
            ) : (
              <div className="container">
                <div className="images">
                  {images.map((image, index) => (
                    <img
                      key={image.id}
                      src={image.download_url}
                      style={{
                        display: currSlide === index ? "block" : "none",
                      }}
                      onLoad={() => setImgLoaded(true)}
                    />
                  ))}
                </div>
                {imgLoaded && (
                  <>
                    <BsArrowLeftCircleFill
                      className="arrow left"
                      onClick={handlePrevSlide}
                    />
                    <BsArrowRightCircleFill
                      className="arrow right"
                      onClick={handleNextSlide}
                    />
                    <div className="indicators">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrSlide(index)}
                          className={currSlide === index ? "active" : ""}
                        ></button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          }
        })()}

        {/* {errMessage && <div className="center">{errMessage}</div>}
        {loading && <div className="center">Loading...</div>}

        {images.length > 0 && (
          <>
            <div className="container">
              <div className="images">
                {images.map((image, index) => (
                  <img
                    key={image.id}
                    src={image.download_url}
                    style={{ display: currSlide === index ? "block" : "none" }}
                  />
                ))}
              </div>
              <BsArrowLeftCircleFill
                className="arrow left"
                onClick={handlePrevSlide}
              />
              <BsArrowRightCircleFill
                className="arrow right"
                onClick={handleNextSlide}
              />
              <div className="indicators">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrSlide(index)}
                    className={currSlide === index ? "active" : ""}
                  ></button>
                ))}
              </div>
            </div>
          </>
        )} */}
      </div>
    </>
  );
}

export default ImageSlider;
