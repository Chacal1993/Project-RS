import { Component, OnInit } from '@angular/core';
import { Router, Routes, ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/models/user';
import { PersonService } from 'src/app/services/person.service';
import { Persons } from 'src/app/models/persons';
import { Profesional, TipoProfesional } from 'src/app/models/profesional';
import { Paciente, TipoSeguro } from 'src/app/models/paciente';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  displayedColumns: string[] = ['numTarjeta', 'nombre', 'tipoSeguro'];
  dataSource = [];

  usuario: Persons;
  paciente: Paciente = new Paciente();
  profesional: Profesional = new Profesional();

  private idUsuario: number;

  constructor(private route: ActivatedRoute, private service: PersonService) {
    this.usuario = new Persons();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((parametros) => {
      this.idUsuario = parametros['params']['user_id'];
    });

    this.service.getPersonById(this.idUsuario).subscribe(persona => {
      if (persona.numColegiado != null) {
        this.usuario = persona;
        this.profesional = persona as Profesional;
      } else {
        this.usuario = persona;
        this.paciente = persona as Paciente;

        this.dataSource = this.paciente.listadoAseguradoras;
      }
    });
  }

  getNameOfEnum(value) {
    return TipoSeguro[value];
  }

  getTipoProfesional(value) {
    return TipoProfesional[value];
  }

}
