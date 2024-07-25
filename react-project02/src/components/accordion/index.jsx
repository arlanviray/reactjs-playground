import { useState } from "react";

import data from "./data";
import "./styles.scss";

function Accordion() {
  const [selected, setSelected] = useState([]);
  const [enableMultiSelect, setEnableMultiSelect] = useState(false);

  const handleSelection = (id) => {
    if (enableMultiSelect) {
      let copySelected = [...selected];
      const findIndexOfId = copySelected.indexOf(id);

      if (findIndexOfId === -1) {
        copySelected.push(id);
      } else {
        copySelected.splice(findIndexOfId, 1);
      }

      setSelected(copySelected);
    } else {
      // check if exist in array
      const findId = selected.includes(id);
      setSelected([findId ? null : id]);
    }
  };

  // console.log(selected);

  return (
    <>
      <div className="project maxwidth accordion">
        <div className="btn-enable">
          <button onClick={() => setEnableMultiSelect(!enableMultiSelect)}>
            Enable <span>{enableMultiSelect ? "SINGLE" : "MULTI"}</span>{" "}
            Selection
          </button>
        </div>

        <ul>
          {data.map(({ id, question, answer }) => (
            <li key={id}>
              <div className="question">
                <button onClick={() => handleSelection(id)}>
                  {selected.indexOf(id) !== -1 ? "-" : "+"}
                </button>
                <span className={selected.indexOf(id) !== -1 ? "open" : ""}>
                  {question}
                </span>
              </div>
              {selected.indexOf(id) !== -1 && (
                <div className="answer">{answer}</div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Accordion;
