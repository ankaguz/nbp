import { HttpInterceptorFn } from '@angular/common/http';

export const httpCoreInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  }));
};
