import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import useLocalStorage from "../../helpers/useLocalStorage";
import "./styles.scss";

function StarRating({ totalStars = 10 }) {
  const [rating, setRating] = useLocalStorage("StarRating", 0);
  const [hover, setHover] = useState(0);

  const handleClick = (index) => {
    setRating(index);
  };

  const handleMouseMove = (index) => {
    setHover(index);
  };

  const handleMouseLeave = () => {
    setHover(rating);
  };

  useEffect(() => {
    setRating(rating);
  }, [rating]);

  // console.log(hover);

  return (
    <>
      <div className="star-rating">
        <div className="stars">
          {[...Array(totalStars)].map((_, index) => {
            index += 1;

            return (
              <FaStar
                className={index <= (hover || rating) ? "active" : "inactive"}
                key={index}
                onClick={() => handleClick(index)}
                onMouseMove={() => handleMouseMove(index)}
                onMouseLeave={handleMouseLeave}
                size={60}
                data-id={index}
                data-hover={hover}
              />
            );
          })}
        </div>
        <div className="ratings center">Rating: {rating}</div>
      </div>
    </>
  );
}

export default StarRating;
