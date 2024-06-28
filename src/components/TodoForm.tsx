import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  addTodo: (todo: string) => void;
}

const TodoForm: React.FC<Props> = ({ addTodo }) => {
  const { t } = useTranslation();
  const [value, setValue] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        className="border p-2 rounded w-full mb-2"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={t("add_task")}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded w-full">
        {t("add")}
      </button>
    </form>
  );
};

export default TodoForm;
