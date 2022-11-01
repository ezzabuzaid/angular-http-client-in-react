import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { useObservable, useObservableState } from "observable-hooks";
import "./App.css";

interface Todo {
	id: number;
	title: string;
}

const getTodos = () => {
	return inject(HttpClient).get<Todo[]>(
		"https://jsonplaceholder.typicode.com/todos/"
	);
};

function App() {
	const todos$ = useObservable(() => getTodos());
	const todos = useObservableState(todos$) ?? [];

	return (
		<>
			{todos.map((todo) => (
				<li>{todo.title}</li>
			))}
		</>
	);
}

export default App;
