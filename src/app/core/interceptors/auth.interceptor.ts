import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let cloneRequest = req;
  if (localStorage.getItem('token')) {
    cloneRequest = req.clone({
      setHeaders: {
        Authorization: localStorage.getItem('token')!
      }
    });
  }
  return next(cloneRequest);
};
