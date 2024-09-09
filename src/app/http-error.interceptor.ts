import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    tap(error => error)
  );
};
