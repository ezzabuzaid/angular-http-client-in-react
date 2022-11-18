import { XhrFactory } from "@angular/common";
import { HttpClient, provideHttpClient } from "@angular/common/http";
import {
	createEnvironmentInjector,
	InjectionToken,
	ɵsetCurrentInjector,
} from "@angular/core";

import { withInterceptors } from "@angular/common/http";
const ENVIRONMENT = new InjectionToken("Enviornment");

// Create injector and provide http client
const injector = createEnvironmentInjector(
	[
		provideHttpClient(
			withInterceptors([
				(req, next) => {
					return next(
						req.clone({ url: "https://jsonplaceholder.typicode.com" + req.url })
					);
				},
			])
		),
		{
			provide: XhrFactory,
			useFactory: () => ({
				build: () => new XMLHttpRequest(),
			}),
		},
		{
			provide: ENVIRONMENT,
			useValue: {},
		},
	],
	null as any
);

// Set injector so `inject` function can work
ɵsetCurrentInjector(injector); // private api

// Or limit the usage to http client only and no private api will be used
export const httpClient = injector.get(HttpClient);
