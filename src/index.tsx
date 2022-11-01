import { XhrFactory } from "@angular/common";
import { provideHttpClient } from "@angular/common/http";
import { createEnvironmentInjector, ɵsetCurrentInjector } from "@angular/core";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Create injector and provide http client
const injector = createEnvironmentInjector(
	[
		provideHttpClient(),
		// or importProvidersFrom(HttpClientModule),
		{
			provide: XhrFactory,
			useFactory: () => ({
				build: () => new XMLHttpRequest(),
			}),
		},
	],
	null as any
);

// Set injector so `inject` function can work
ɵsetCurrentInjector(injector);

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
