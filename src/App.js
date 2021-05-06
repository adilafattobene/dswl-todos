import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    console.log("Fetch Data");

    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((err) => {
        console.log("Erro", err);
      });
  }, []);

  const onTodoSubmit = (event) => {
    event.preventDefault();

    let newTask = {
      id: todos.length,
      title: event.target.title.value,
    };

    axios
      .post("https://jsonplaceholder.typicode.com/todos", newTask)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log("Erro", err);
      });
  };

  const changeTodo = (event) => {
    event.preventDefault();

    let id = Number(event.target.id.value);

    let newBooks = todos.slice();

    newBooks[id].title = event.target.title.value;

    setTodos(newBooks);
  };

  return (
    <div className="App">
      <form onSubmit={onTodoSubmit}>
        <input type="text" id="title" placeholder="Digite o título da tarefa" />
        <input type="submit" id="btnSubmit" value="Cadastrar" />
      </form>
      <br />
      <br />
      <p>TO DOS</p>
      {todos.map((todo, index) => {
        return (
          <div>
            <form onSubmit={changeTodo}>
              <input type="text" id="id" placeholder={index + 1} disabled />
              <input type="text" id="title" placeholder={todo.title}/>
              <input type="submit" id="btnSubmit" value="Editar" />
            </form>
          </div>
        );
      })}
    </div>
  );
}

export default App;
