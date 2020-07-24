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

  person: Persons;
  paciente: Paciente = new Paciente();
  profesional: Profesional = new Profesional();

  private idUsuario: string;

  constructor(private route: ActivatedRoute, private service: PersonService) {
    this.person = new Persons();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((parametros) => {
      this.idUsuario = parametros['params']['user_id'];
    });

    this.service.getProfesionalById(this.idUsuario).subscribe(prof => {
      if (prof === null) {
        this.service.getPacienteById(this.idUsuario).subscribe(pac => {
          if (pac !== null) {
            this.person = pac as Persons;
            this.paciente = pac;
            this.dataSource = this.paciente.listadoAseguradoras;
          }
        })
      } else {
        this.person = prof as Persons;
        this.profesional = prof;
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
