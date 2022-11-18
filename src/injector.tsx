import { XhrFactory } from "@angular/common";
import { HttpClient, provideHttpClient } from "@angular/common/http";
import {
	createEnvironmentInjector,
	InjectionToken,
	ɵsetCurrentInjector,
} from "@angular/core";

import { DOCUMENT } from "@angular/common";
import { HttpClientXsrfModule, withInterceptors } from "@angular/common/http";
import { importProvidersFrom, PLATFORM_ID } from "@angular/core";
const ENVIRONMENT = new InjectionToken("Enviornment");

// Create injector and provide http client
const injector = createEnvironmentInjector(
	[
		importProvidersFrom(HttpClientXsrfModule),
		provideHttpClient(
			withInterceptors([
				(req, next) => {
					return next(req.clone({ url: "http://localhost:3000" + req.url }));
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
			provide: DOCUMENT,
			useValue: document,
		},
		{
			provide: PLATFORM_ID,
			useValue: "browser",
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
