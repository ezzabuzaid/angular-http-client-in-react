import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { Todo } from "./todo.repo";

export const getTodos = () => {
	return inject(HttpClient).get<Todo[]>("/todos/");
};
