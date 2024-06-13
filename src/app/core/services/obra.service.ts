import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Obra } from '../models/obra.model';

@Injectable({
  providedIn: 'root'
})
export class ObraService {

  private readonly _http = inject(HttpClient);
  private readonly _urlApi = `${environment.apiUrl}/Obra` ;

  obtenerObras() : Observable<Obra> {
    return this._http.get<Obra>(`${this._urlApi}`);
  }

  guardarObras(obra : Obra) : Observable<Obra> {
    return this._http.post<Obra>(`${this._urlApi}`, obra)
  }

  editarObra(obra : Obra) : Observable<Obra>{
    return this._http.put<Obra>(`${this._urlApi}/${obra.id}`, obra)
  }
}
