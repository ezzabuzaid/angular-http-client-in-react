import { finalize } from "rxjs";
import { getTodos } from "./todo.api";
import { setLoading, setTodos } from "./todo.repo";

export const loadTodos = () => {
	getTodos()
		.pipe(finalize(() => setLoading(false)))
		.subscribe({ next: setTodos });
};
