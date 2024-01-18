import { useEffect, useState } from "react";
import "./App.css";

function App() {
  let URL = "http://localhost:3000";

  let [todos, setTodos] = useState([]);
  let [inputText, setInputText] = useState("");

  const getTodos = () => {
    fetch(URL, { method: "get" })
      .then((res) => res.json())
      .then((res) => setTodos(res))
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    fetch(URL + `/delete/${id}`, { method: "delete" }).then((res) =>
      res.json()
    );

    setTodos((todos) => todos.filter((todo) => todo._id !== id));
  };


  const handleSubmit = async () => {
    const data = await fetch(URL + `/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: inputText,
      }),
    }).then((res) => res.json());

    setTodos([...todos, data]);
    setInputText("");
  };


  const handleComplete = async (id) => {
    try {
      const response = await fetch(URL + `/update/${id}`, { method: "put" });
      const data = await response.json();
      
      setTodos(todos=>
        todos.map((todo) =>
          todo._id === data._id ? { ...todo, complete: data.complete } : todo
        )
      );
      
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  }; 


  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="container">
      <div className="wrapper">
        <h1>Todo App MERN stack</h1>
        <input
          placeholder={"Enter todo here"}
          className="inputField"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button onClick={handleSubmit} type="submit" className="addBtn">Add</button>
        <div className="todos">
          {todos.map((todo) => (
             (
              <div className="todo" key={todo._id}>
                <div
                  className={
                    "text-container " +
                    (todo.complete ? "is-completed" : "")
                  }
                >
                  <div
                    className="checkbox"
                    onClick={()=> handleComplete(todo._id)}
                  ></div>
                  <div className="text" onDoubleClick={()=> handleComplete(todo._id)}>{todo.text}</div>
                </div>
                <div
                  className="deleteBtn"
                  onClick={() => handleDelete(todo._id)}
                >
                  X
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
