import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { provideRouter, withInMemoryScrolling } from "@angular/router";

import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: "top" })),
    // Make <mat-icon> use the Material Symbols Rounded font loaded in index.html.
    provideAppInitializer(() => {
      inject(MatIconRegistry).setDefaultFontSetClass("material-symbols-rounded");
    }),
  ],
};
