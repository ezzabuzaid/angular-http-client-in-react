import { createStore, select, setProp, withProps } from "@ngneat/elf";
import {
	addEntities,
	deleteEntities,
	selectAllEntitiesApply,
	setEntities,
	updateEntities,
	withEntities,
} from "@ngneat/elf-entities";
import { switchMap } from "rxjs/operators";

export interface Todo {
	id: string;
	title: string;
	completed: boolean;
}

export interface TodosProps {
	loading: boolean;
	filter: "ALL" | "ACTIVE" | "COMPLETED";
}

const store = createStore(
	{ name: "todos" },
	withProps<TodosProps>({ filter: "ALL", loading: true }),
	withEntities<Todo>()
);

const activeFilter$ = store.pipe(select(({ filter }) => filter));
export const loading$ = store.pipe(select(({ loading }) => loading));

export const visibleTodos$ = activeFilter$.pipe(
	switchMap((filter) => {
		return store.pipe(
			selectAllEntitiesApply({
				filterEntity({ completed }) {
					if (filter === "ALL") return true;
					return filter === "COMPLETED" ? completed : !completed;
				},
			})
		);
	})
);

export function updateTodosFilter(filter: TodosProps["filter"]) {
	store.update(setProp("filter", filter));
}

export function setTodos(todos: Todo[]) {
	store.update(setEntities(todos));
}

export function setLoading(loading: boolean) {
	store.update(setProp("loading", loading));
}

export function addTodo(text: Todo["title"]) {
	store.update(
		addEntities({
			id: Math.random().toFixed(5),
			title: text,
			completed: false,
		})
	);
}

export function updateTodoCompleted(id: Todo["id"]) {
	store.update(
		updateEntities(id, (todo) => ({
			...todo,
			completed: !todo.completed,
		}))
	);
}

export function deleteTodo(id: Todo["id"]) {
	store.update(deleteEntities(id));
}
