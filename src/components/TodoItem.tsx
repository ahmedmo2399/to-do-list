import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  todo: string;
  index: number;
  removeTodo: (index: number) => void;
}

const TodoItem: React.FC<Props> = ({ todo, index, removeTodo }) => {
  const { t } = useTranslation();
  return (
    <li className="flex justify-between items-center bg-gray-200 p-2 rounded mb-2">
      {todo}
      <button
        onClick={() => removeTodo(index)}
        className="bg-red-500 text-white px-2 py-1 rounded">
        {t("delete")}
      </button>
    </li>
  );
};

export default TodoItem;
