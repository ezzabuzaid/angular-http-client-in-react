import { useObservableState } from "observable-hooks";
import { Todo, visibleTodos$ } from "./bl/todo.repo";
import { loadTodos } from "./bl/todo.service";

loadTodos();

function App() {
	const todos = useObservableState(visibleTodos$) ?? ([] as Todo[]);
	return (
		<>
			{todos.map((todo) => (
				<li key={todo.id}>{todo.title}</li>
			))}
		</>
	);
}

export default App;
