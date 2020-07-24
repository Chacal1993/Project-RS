import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, merge } from 'rxjs';
import { Persons } from '../models/persons';
import { Paciente } from '../models/paciente';
import { Profesional } from '../models/profesional';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  SERVER_URL = 'http://localhost:5000/persons/';
  SERVER_URL_PACIENTE = 'http://localhost:3000/paciente/';
  SERVER_URL_PROFESIONAL = 'http://localhost:3000/profesional/';

  constructor(private httpClient: HttpClient) { }

  getPacientes(): Observable<Paciente[]> {
    return this.httpClient.get<Paciente[]>(this.SERVER_URL_PACIENTE);
  }

  getProfesionales(): Observable<Profesional[]> {
    return this.httpClient.get<Profesional[]>(this.SERVER_URL_PROFESIONAL);
  }

  getProfesionalById(idProf: string): Observable<Profesional> {
    return this.httpClient.get<Profesional>(this.SERVER_URL_PROFESIONAL + idProf);
  }

  getPacienteById(idPac: string) {
    return this.httpClient.get<Paciente>(this.SERVER_URL_PACIENTE + idPac);
  }

  createProfesional(profesional: Profesional): Observable<Profesional> {
    return this.httpClient.post<Profesional>(this.SERVER_URL_PROFESIONAL + 'create/', profesional);
  }

  createPaciente(paciente: Paciente): Observable<Paciente> {
    return this.httpClient.post<Paciente>(this.SERVER_URL_PACIENTE + 'create/', paciente);
  }

  updateProfesional(idProf: string, profesional: Profesional): Observable<Profesional> {
    return this.httpClient.put<Profesional>(this.SERVER_URL_PROFESIONAL + 'update?id=' + idProf, profesional);
  }

  updatePaciente(idPac: string, paciente: Paciente): Observable<Paciente> {
    return this.httpClient.put<Paciente>(this.SERVER_URL_PACIENTE + 'update?id=' + idPac, paciente);
  }

  deletePaciente(id: string) {
    return this.httpClient.delete(this.SERVER_URL_PACIENTE + 'delete?idPac=' + id);
  }

  deleteProfesional(id: string) {
    return this.httpClient.delete(this.SERVER_URL_PROFESIONAL + 'delete?idProf=' + id);
  }

  deleteMedicos() {
    return this.httpClient.delete(this.SERVER_URL_PROFESIONAL + 'delete/medicos');
  }

  createUsuario(person) {
    return this.httpClient.post(this.SERVER_URL, person);
  }

  updateUsuario(person) {
    return this.httpClient.put(this.SERVER_URL + person.id, person);
  }
}
