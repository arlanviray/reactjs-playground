import { useState } from "react";
import QRCode from "react-qr-code";
import "./styles.scss";

function QRCodeGenerator() {
  const [qrCode, setQrCode] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleOnchangeInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleGenerateCode = () => {
    setQrCode(inputValue);
    setInputValue("");
  };

  return (
    <div className="qr-code-generator maxwidth mwsmall">
      <div className="fields">
        <input
          type="text"
          placeholder="Enter your value here..."
          onChange={handleOnchangeInput}
        />
        <button
          onClick={handleGenerateCode}
          disabled={inputValue && inputValue.trim() !== "" ? false : true}
        >
          Generate Code!
        </button>
      </div>
      <QRCode
        value={qrCode}
        style={{ height: "auto", width: "100%", maxWidth: "100%" }}
        viewBox={`0 0 256 256`}
      />
    </div>
  );
}

export default QRCodeGenerator;
