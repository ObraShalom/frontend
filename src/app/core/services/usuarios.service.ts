import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuarios.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private readonly _http = inject(HttpClient);

  private readonly _urlApi = `${environment.apiUrl}/User` ;

  obtenerUsuarios() : Observable<Usuario> {
    return this._http.get<Usuario>(`${this._urlApi}`);
  }

  guardarUsuarios(usuario : Usuario) : Observable<any> {
    return this._http.post<any>(`${this._urlApi}/Registro`, usuario );
  }

  actualizarUsuarios(usuario : Usuario) : Observable<any> {
    return this._http.put<any>(`${this._urlApi}/${usuario.id}`, usuario );
  }
}
