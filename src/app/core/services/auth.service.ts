import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token = '';

  private readonly _http = inject(HttpClient);
  private readonly JWT = 'JWT_TOKEN';

  private loggedUser!: string;
  apiUrl = environment.apiUrl;;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private isLoggedInSubject: BehaviorSubject<boolean>;
  private tokenKey = 'auth-token';

  constructor() {
    // Inicializa el BehaviorSubject con el estado actual de si hay un token almacenado
    this.isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  }
  authLogin(value: any): Observable<any> {
    console.log(this.apiUrl);
    
    return this._http.post(`${this.apiUrl}/User/Login`, value).pipe(tap((response: any) => {
      if (response && response.token) {
        localStorage.setItem(this.tokenKey, response.token);
        this.isLoggedInSubject.next(true);
      }
    }));
  }
  /**
   * Verifica si hay un token almacenado en localStorage.
   * @returns true si hay un token almacenado, false en caso contrario
   */
  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  /**
   * Cierra la sesión del usuario.
   * Elimina el token del localStorage y actualiza el estado de autenticación.
   */
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.isLoggedInSubject.next(false);
  }

  /**
   * Obtiene el token almacenado en localStorage.
   * @returns El token de autenticación o null si no existe
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Devuelve un observable que emite el estado de autenticación del usuario.
   * @returns Un observable de booleanos que indica si el usuario está autenticado
   */
  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }
}
