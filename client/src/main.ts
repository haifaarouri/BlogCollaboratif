import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './app/utils/auth.interceptor';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
});
