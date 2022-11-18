import { useSubscription } from "observable-hooks";
import { useState } from "react";
import { Observable } from "rxjs";
import { loading$, visibleTodos$ } from "./bl/todo.repo";
import { loadTodos } from "./bl/todo.service";

loadTodos();

function useSelector<T>(selector$: Observable<T>, defaultValue?: T) {
	const [next, setNext] = useState<T | undefined>();
	const [error, setError] = useState();
	const [, setComplete] = useState<void>();
	useSubscription(selector$, {
		next: (data) => {
			console.log("data");
			setNext(data);
		},
		error: (error) => {
			console.log("error");
			setError(error);
		},
		complete: () => {
			console.log("complete");
			setComplete();
		},
	});

	return [next, error];
	// return useObservableState(selector$, defaultValue);
}

function App() {
	// const todos$ = useObservable(() => visibleTodos$);
	// const todos = useObservableState(todos$) ?? [];

	const [todos, error] = useSelector(visibleTodos$);
	const [loading] = useSelector(loading$, true);
	if (loading) {
		return <div>loading...</div>;
	}

	if (error) {
		return <div>error...</div>;
	}

	return (
		<>
			{todos!.map((todo) => (
				<li>{todo.title}</li>
			))}
		</>
	);
}

export default App;
