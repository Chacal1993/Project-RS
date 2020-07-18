import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/services/person.service';


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
  dataSource: any[];

  constructor(private service: PersonService) {
    this.dataSource = [];
  }

  ngOnInit(): void {
    this.service.getPerson().subscribe(persons => {
      this.dataSource = persons as [];
    })
  }

  mostrar(valor) {
    alert(valor);
  }
}
