import { Todo } from "./components/Todo";
import { createRoot } from "react-dom/client";

import { DialogContent } from "@mui/material";
import TodoAppBar from './components/TodoAppBar';

export default function App() {
  return (
    <DialogContent className="App">
      <TodoAppBar />
      <Todo/>
    </DialogContent>
  );
}

const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

root.render(<App />);