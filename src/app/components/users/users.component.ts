import { Component, OnInit } from '@angular/core';


const ELEMENT_DATA: any[] = [
  { NIF: 1, nombreCompleto: 'Hydrogen', genero: 'M', fechaNacimiento: new Date() },
  { NIF: 2, nombreCompleto: 'Hydrogen', genero: 'M', fechaNacimiento: new Date() },
];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['NIF', 'nombreCompleto', 'genero', 'fechaNacimiento', 'acciones'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

  mostrar(valor) {
    alert(valor);
  }
}
