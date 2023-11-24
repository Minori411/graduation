import { TodoItem } from "./Todo";

type Props = {
  todos: TodoItem[];
  onChange: (id?: number) => Promise<void>;
  onClick: (id?: number) => Promise<void>;
};

export const TodoList = ({ todos, onChange, onClick }: Props) => {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.isComplete}
            onChange={() => {
              onChange(todo.id);
            }}
          />
          {todo.isComplete ? (
            <span style={{ textDecorationLine: "line-through" }}>
              {todo.name}
            </span>
          ) : (
            <span>{todo.name}</span>
          )}
          <button onClick={() => onClick(todo.id)}>削除</button>
        </li>
      ))}
    </ul>
  );
};