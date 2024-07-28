import Tabs from "./Tabs";
import TabContent2 from "./TabContent2";
import TabContent3 from "./TabContent3";
import "./styles.scss";

function CustomTabs() {
  const tabs = [
    {
      label: "Tab 1",
      content: <p>This is content for Tab 1</p>,
    },
    {
      label: "Tab 2",
      content: <TabContent2 />,
    },
    {
      label: "Tab 3",
      content: <TabContent3 />,
    },
  ];

  const handleChange = (tabIndex) => {
    console.log("Label:", tabs[tabIndex].label, "Index:", tabIndex);
  };

  return (
    <div className="custom-tabs maxwidth mwmedium">
      <Tabs tabs={tabs} onChange={handleChange} />
    </div>
  );
}

export default CustomTabs;
