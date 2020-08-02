import { Component, OnInit, ViewChild } from '@angular/core';
import { PersonService } from 'src/app/services/person.service';
import { TipoProfesional, Profesional } from 'src/app/models/profesional';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Persons } from 'src/app/models/persons';
import { Paciente } from 'src/app/models/paciente';
import { merge } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['tipo', 'NIF', 'nombreCompleto', 'genero', 'fechaNacimiento', 'acciones'];
  dataSource = new MatTableDataSource<Paciente | Profesional>([]);

  personas: Array<Paciente | Profesional>;
  pacientes: Paciente[];
  profesionales: Profesional[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private service: PersonService) {
    this.pacientes = [];
    this.profesionales = [];
    this.personas = new Array();
  }

  ngOnInit(): void {
    document.body.className = "mat-typography bg-fixed";

    this.actualizarDatosTabla();
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator._intl.itemsPerPageLabel = "Elementos por página";
  }

  actualizarDatosTabla() {
    this.pacientes = [];
    this.profesionales = [];
    this.personas = [];
    this.service.getPacientes().subscribe(r => {
      this.pacientes = r['personas'] as Paciente[];

      this.service.getProfesionales().subscribe(r => {
        this.profesionales = r['profs'] as Profesional[];

        this.dataSource.data = this.personas.concat(this.profesionales, this.pacientes).sort((a, b) => {
          if (a.createdAt.valueOf() < b.createdAt.valueOf()) {
            return -1;
          }
          if (a.createdAt.valueOf() > b.createdAt.valueOf()) {
            return 1;
          }
          return 0;
        }
        );
      });
    });
  }


  deletePerson(persona) {
    Swal.fire({
      title: '¿Estás seguro que deseas borrar este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.value) {
        if ((persona as Profesional).numColegiado != null) {
          //eliminar un profesional
          this.service.deleteProfesional(persona._id).subscribe(r => {
            this.actualizarDatosTabla();
            Swal.fire({
              icon: 'success',
              title: 'Eliminado!',
              showConfirmButton: false,
              timer: 1500
            });
          });
        } else {
          //eliminar un paciente
          this.service.deletePaciente(persona._id).subscribe(r => {
            this.actualizarDatosTabla();
            Swal.fire({
              icon: 'success',
              title: 'Eliminado!',
              showConfirmButton: false,
              timer: 1500
            });
          });
        }
      }
    });
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
            this.service.deleteMedicos().subscribe(r => {
              this.actualizarDatosTabla();

            });
            Swal.fire({
              icon: 'success',
              title: 'Los médicos se han eliminado de forma satisfactoria!',
              showConfirmButton: false,
              timer: 1500
            });
          }
        });
      }
    });
  }

  ngOnDestroy() {
    document.body.className = "mat-typography";
  }
}
