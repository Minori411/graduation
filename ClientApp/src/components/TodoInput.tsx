import { ChangeEvent } from "react";

type Props = {
  text: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: () => Promise<void>;
};

export const TodoInput = ({ text, onChange, onClick }: Props) => {
  return (
    <>
      <input type="text" onChange={onChange} value={text} />
      <button onClick={onClick}>追加</button>
    </>
  );
};