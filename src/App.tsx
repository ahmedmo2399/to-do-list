import React, { useState, useEffect } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  isEditing: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() === "") return;
    setTodos([
      ...todos,
      { id: Date.now(), text: newTodo, completed: false, isEditing: false },
    ]);
    setNewTodo("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: true } : todo
      )
    );
  };

  const saveTodo = (id: number, newText: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText, isEditing: false } : todo
      )
    );
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const newText = e.target.value;
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div className="flex mb-4">
        <input
          className="border rounded w-full py-2 px-3 mr-4"
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={addTodo}>
          Add
        </button>
      </div>
      <ul className="list-disc pl-5">
        {todos.map((todo) => (
          <li key={todo.id} className="flex justify-between items-center mb-2">
            {todo.isEditing ? (
              <input
                className="border rounded w-full py-2 px-3 mr-4"
                type="text"
                value={todo.text}
                onChange={(e) => handleEditChange(e, todo.id)}
                onBlur={() => saveTodo(todo.id, todo.text)}
                autoFocus
              />
            ) : (
              <span
                className={`flex-1 cursor-pointer ${
                  todo.completed ? "line-through" : ""
                }`}
                onClick={() => toggleTodo(todo.id)}>
                {todo.text}
              </span>
            )}
            <div className="flex items-center">
              {!todo.isEditing && (
                <button
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                  onClick={() => editTodo(todo.id)}>
                  Edit
                </button>
              )}
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                onClick={() => deleteTodo(todo.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
