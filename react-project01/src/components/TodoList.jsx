import { useState } from "react";

function TodoList({ title }) {
  const [todos, setTodos] = useState([]);
  const [inputVal, setInputVal] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputVal) {
      setTodos([...todos, inputVal]);
      setInputVal("");
    }
  };

  const handleDelete = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <>
      <h1>{title}</h1>

      <section>
        <div className="proj-todolist">
          <form>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
            />
            <button onClick={handleSubmit}>Add</button>
          </form>

          {todos.length > 0 && (
            <ul>
              {todos.map((todo, index) => (
                <li key={index}>
                  <button onClick={() => handleDelete(index)}>X</button>
                  <span>{todo}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}

export default TodoList;
