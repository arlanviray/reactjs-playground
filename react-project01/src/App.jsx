// components
import Counter from "./components/Counter";
import TodoList from "./components/TodoList";

// styles
import "./App.scss";

function App() {
  const projectComponents = [
    {
      title: "Counter",
      component: Counter,
    },
    {
      title: "Todo List",
      component: TodoList,
    },
  ];

  return (
    <>
      {projectComponents.map((Project, index) => {
        return (
          <>
            <div className="project" key={index}>
              <Project.component title={Project.title} />
            </div>
          </>
        );
      })}
    </>
  );
}

export default App;
