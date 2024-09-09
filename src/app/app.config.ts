import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { APP_ROUTES } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpCoreInterceptor } from './http-core.interceptor';
import { httpErrorInterceptor } from './http-error.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(APP_ROUTES),
    provideHttpClient(
      withInterceptors([httpCoreInterceptor, httpErrorInterceptor]),
    ), provideAnimationsAsync(),
  ]
};
