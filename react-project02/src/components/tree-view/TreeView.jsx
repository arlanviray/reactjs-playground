import MenuList from "./MenuList";
import data from "./data";
import "./styles.scss";

function TreeView() {
  return (
    <div className="tree-view">
      <MenuList list={data} />
    </div>
  );
}

export default TreeView;
