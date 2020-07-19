import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persons } from '../models/persons';
import { identifierModuleUrl } from '@angular/compiler';
import { TipoProfesional } from 'src/app/models/profesional';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  SERVER_URL = 'http://localhost:3000/persons/';

  constructor(private httpClient: HttpClient) { }

  getPerson(): Observable<Persons[]> {
    return this.httpClient.get<Persons[]>(this.SERVER_URL);
  }

  getPersonById(idPersona: number) {
    return this.httpClient.get<any>(this.SERVER_URL + idPersona.toString());
  }

  createUsuario(person) {
    console.log(person);
    return this.httpClient.post(this.SERVER_URL, person);
  }

  updateUsuario(person) {
    return this.httpClient.put(this.SERVER_URL + person.id, person);
  }

  deleteUsuario(idPersona) {
    console.log(idPersona);
    return this.httpClient.delete(this.SERVER_URL + idPersona);
  }
}
