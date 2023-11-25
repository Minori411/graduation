// import { Todo } from "./components/Todo";
import { createRoot } from "react-dom/client";
import TodoList from './components/TodoList';
import { RecoilRoot } from 'recoil';
import { DialogContent } from "@mui/material";
import TodoAppBar from './components/TodoAppBar';

export default function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <TodoAppBar />
        <TodoList/>
      </div>
    </RecoilRoot>
  );
}

const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

root.render(<App />);