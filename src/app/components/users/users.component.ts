import { Component, OnInit, ViewChild } from '@angular/core';
import { PersonService } from 'src/app/services/person.service';
import { TipoProfesional, Profesional } from 'src/app/models/profesional';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Persons } from 'src/app/models/persons';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['tipo', 'NIF', 'nombreCompleto', 'genero', 'fechaNacimiento', 'acciones'];
  dataSource = new MatTableDataSource<Persons>([]);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private service: PersonService) {
  }

  ngOnInit(): void {
    this.service.getPerson().subscribe(persons => {
      this.dataSource.data = persons;
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator._intl.itemsPerPageLabel = "Elementos por página";
    })
  }

  deletePerson(id) {
    Swal.fire({
      title: '¿Estás seguro que deseas borrar este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.value) {
        this.service.deleteUsuario(id).subscribe(r => {
          this.service.getPerson().subscribe(persons => {
            this.dataSource.data = persons;
          });
        });
        Swal.fire({
          icon: 'success',
          title: 'Eliminado!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })

  }

  deleteProfesionalMedico() {

    Swal.fire({
      title: '¿Estás seguro que deseas eliminar todos los médicos?',
      text: "Si elimina todos los médicos no podrá recuperar la información",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.value) {
        this.dataSource.data.map(persona => {
          const p = persona as Profesional;
          if (p.tipoProfesional === TipoProfesional.MEDICO) {
            this.service.deleteUsuario(persona.id).subscribe(r => {
              this.service.getPerson().subscribe(persons => {
                this.dataSource.data = persons;
              });

              Swal.fire({
                icon: 'success',
                title: 'Los médicos se han eliminado de forma satisfactoria!',
                showConfirmButton: false,
                timer: 1500
              })
            })
          }
        });
      }
    });
  }
}
