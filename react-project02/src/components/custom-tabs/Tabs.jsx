import { useState } from "react";

function Tabs({ tabs, onChange }) {
  const [currTabIndex, setCurrTabIndex] = useState(0);

  const handleClick = (index) => {
    setCurrTabIndex(index);
    onChange(index);
  };

  return (
    <>
      <div className="tabs">
        {tabs.map((tab, index) => (
          <div
            className={currTabIndex === index ? "active" : ""}
            key={index}
            onClick={() => handleClick(index)}
          >
            {tab.label}
          </div>
        ))}
      </div>

      <div className="content center">
        {tabs[currTabIndex] && tabs[currTabIndex].content}
      </div>
    </>
  );
}

export default Tabs;
