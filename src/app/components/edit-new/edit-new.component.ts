import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Profesional } from 'src/app/models/profesional';
import { Paciente } from 'src/app/models/paciente';
import { Aseguradora } from 'src/app/models/aseguradora';
import { PersonService } from 'src/app/services/person.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit-new',
  templateUrl: './edit-new.component.html',
  styleUrls: ['./edit-new.component.scss']
})
export class EditNewComponent implements OnInit {
  idPersona: number;
  persona: any = {};
  isEdit: boolean;

  personFormGroup: FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  aseguradoras: Aseguradora[];

  tipo: 'profesional' | 'paciente' = 'paciente';
  disabled = false;

  constructor(private _formBuilder: FormBuilder, private personService: PersonService, private route: ActivatedRoute) {
    this.aseguradoras = [];
    this.isEdit = false;
  }

  ngOnInit() {
    /**OBTENER ID QUE PASA POR PARAMETRO */
    this.route.paramMap.subscribe((parametros) => {
      this.idPersona = parametros['params']['user_id'];
    });

    /**BUSCAR PERSONA POR ID */
    this.personService.getPersonById(this.idPersona).subscribe(p => {
      this.persona = p;
      this.isEdit = true;
      if (p.numColegiado != null) {
        this.tipo = 'profesional';
      } else {
        this.tipo = 'paciente';
        this.aseguradoras = this.persona.listadoAseguradoras;
      }
      this.changeTipoPersona();
    });

    /**VALIDACIONES DE LOS FORMULARIOS */
    this.firstFormGroup = this._formBuilder.group({
      nombre: ['', Validators.required],
      primerApellido: ['', Validators.required],
      NHC: ['', Validators.required],
      numColegiado: [''],
      NIF: [''],
      segundoApellido: ['']
    });

    this.secondFormGroup = this._formBuilder.group({
      calle: [''],
      numero: [''],
      puerta: [''],
      codigoPostal: [''],
      ciudad: ['']
    });
    this.thirdFormGroup = this._formBuilder.group({
      numTarjeta: [''],
      nombreAseguradora: [''],
      tipoSeguro: ['']
    });
  }

  addPerson(person, direccion) {
    if (this.tipo === 'profesional') {
      const profesional = new Profesional();
      profesional.numColegiado = person.numColegiado;
      profesional.nombre = person.nombre;
      profesional.primerApellido = person.primerApellido;
      profesional.segundoApellido = person.segundoApellido;
      profesional.NIF = person.NIF;

      profesional.direccion = direccion;

      this.personService.createUsuario(profesional).subscribe((result) => {
        console.log('profesional creado');
      });
    } else {
      const paciente = new Paciente();
      paciente.NHC = person.NHC;
      paciente.nombre = person.nombre;
      paciente.primerApellido = person.primerApellido;
      paciente.segundoApellido = person.segundoApellido;
      paciente.NIF = person.NIF;
      paciente.direccion = person.direccion;
      paciente.listadoAseguradoras = this.aseguradoras;
      console.log(paciente);
      this.personService.createUsuario(paciente).subscribe((result) => {
        console.log('paciente creado');
      });
    }
  }

  limpiar() {
    this.aseguradoras = [];
    this.firstFormGroup.reset();
    this.secondFormGroup.reset();
    this.thirdFormGroup.reset();
  }

  changeTipoPersona() {
    if (!this.isEdit) {
      this.limpiar();
    }

    if (this.tipo === 'paciente') {
      this.firstFormGroup.get('NHC').setValidators([Validators.required]);
      this.firstFormGroup.get('numColegiado').setValidators(Validators.nullValidator);

      this.firstFormGroup.get('NHC').updateValueAndValidity();
      this.firstFormGroup.get('numColegiado').updateValueAndValidity();
    } else {
      this.firstFormGroup.get('NHC').setValidators([Validators.nullValidator]);
      this.firstFormGroup.get('numColegiado').setValidators(Validators.required);

      this.firstFormGroup.get('NHC').updateValueAndValidity();
      this.firstFormGroup.get('numColegiado').updateValueAndValidity();
      /*  this.firstFormGroup.get('county').clearValidators(); */
    }
  }

  insertarAseguradora(formulario) {
    this.aseguradoras.push(formulario);
    this.thirdFormGroup.reset();
  }

  updatePerson() {
    console.log(this.persona);
  }
}
