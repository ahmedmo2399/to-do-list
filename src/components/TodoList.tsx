import React from "react";
import TodoItem from "./TodoItem";

interface Props {
  todos: { text: string }[];
  removeTodo: (index: number) => void;
}

const TodoList: React.FC<Props> = ({ todos, removeTodo }) => {
  return (
    <ul>
      {todos.map((todo, index) => (
        <TodoItem
          key={index}
          index={index}
          todo={todo.text}
          removeTodo={removeTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;
