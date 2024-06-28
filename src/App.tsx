import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import "./i18n";
import "./index.css";

interface Todo {
  text: string;
}

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (todo: string) => {
    setTodos([...todos, { text: todo }]);
  };

  const removeTodo = (index: number) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl">{t("title")}</h1>
          <div>
            <button onClick={() => changeLanguage("en")} className="mr-2">
              EN
            </button>
            <button onClick={() => changeLanguage("ar")}>AR</button>
          </div>
        </div>
        <TodoForm addTodo={addTodo} />
        <TodoList todos={todos} removeTodo={removeTodo} />
      </div>
    </div>
  );
};

export default App;
