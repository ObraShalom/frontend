import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const auth = inject(AuthService);
    const username = '11181750';
    const password = '60-dayfreetrial';
    const authHeader = 'Basic ' + btoa(username + ':' + password);
    if (auth.getToken()) {

      const cloned =req.clone({
        headers: req.headers.set('Authorization', authHeader)
      });
      return next(cloned);
    }
    return next(req);
};
