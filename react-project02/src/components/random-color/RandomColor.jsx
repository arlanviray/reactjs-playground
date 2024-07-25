import { useEffect, useState } from "react";

import "./styles.scss";

function RandomColor() {
  const [color, setColor] = useState("");
  const [colorType, setColorType] = useState("hex");

  const generateRandom = (length) => {
    return Math.floor(Math.random() * length);
  };

  const handleRandomHEX = () => {
    // #678765
    const arrHex = [1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
    // randomise arrHex
    const randArrHex = arrHex.sort(() => Math.random() - 0.5);
    // get the first 6 and join them to string
    const strHex = randArrHex.splice(0, 6).join("");

    setColor(`#${strHex}`);
  };

  const handleRandomRGB = () => {
    const maxNumber = 256;
    const red = generateRandom(maxNumber);
    const green = generateRandom(maxNumber);
    const blue = generateRandom(maxNumber);

    setColor(`rgb(${red}, ${green}, ${blue})`);
  };

  useEffect(() => {
    if (colorType === "hex") {
      console.log("hex");
      handleRandomHEX();
    } else {
      console.log("rgb");
      handleRandomRGB();
    }
  }, [colorType]);

  // set the color into body
  // document.body.style.background = color;

  // console.log(color);

  return (
    <>
      <div className="random-color">
        <div className="buttons">
          <button
            onClick={() => setColorType("hex")}
            disabled={colorType === "hex"}
          >
            Create HEX Color
          </button>
          <button
            onClick={() => setColorType("rgb")}
            disabled={colorType === "rgb"}
          >
            Create RGB Color
          </button>
          <button
            onClick={colorType === "hex" ? handleRandomHEX : handleRandomRGB}
          >
            Generate Random{" "}
            <span style={{ backgroundColor: color }}>
              {colorType.toUpperCase()}
            </span>{" "}
            Color
          </button>
        </div>
        <div className="type center">{colorType.toUpperCase()} Color</div>
        <div className="color center">{color}</div>
        <div className="bodycolor" style={{ backgroundColor: color }}></div>
      </div>
    </>
  );
}

export default RandomColor;
