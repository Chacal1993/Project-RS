import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Profesional } from 'src/app/models/profesional';
import { Paciente, TipoSeguro } from 'src/app/models/paciente';
import { Direccion } from 'src/app/models/direccion';
import { Aseguradora } from 'src/app/models/aseguradora';
import { PersonService } from 'src/app/services/person.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-edit-new',
  templateUrl: './edit-new.component.html',
  styleUrls: ['./edit-new.component.scss']
})
export class EditNewComponent implements OnInit {
  idPersona: number;
  persona: any = {};
  isEdit: boolean;

  displayedColumns: string[] = ['numTarjeta', 'nombreAseguradora', 'tipoSeguro', 'acciones'];
  dataSource = [];

  personFormGroup: FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  aseguradoras: Aseguradora[];

  tipo: 'profesional' | 'paciente' = 'paciente';
  disabled = false;

  constructor(private _formBuilder: FormBuilder, private personService: PersonService, private route: ActivatedRoute, private router: Router) {
    this.aseguradoras = [];
    this.isEdit = false;
    this.persona.direccion = {};
  }

  ngOnInit() {
    /**OBTENER ID QUE PASA POR PARAMETRO */
    this.route.paramMap.subscribe((parametros) => {
      this.idPersona = parametros['params']['user_id'];
    });


    /**BUSCAR PERSONA POR ID */
    this.personService.getPersonById(this.idPersona).subscribe(p => {
      if (p != null && !Array.isArray(p)) {
        this.persona = p;
        this.isEdit = true;
        if (p.numColegiado != null) {
          this.tipo = 'profesional';
          if (p.tipoProfesional) {
            this.firstFormGroup.get('tipoProfesional').setValue(p.tipoProfesional.toString());
          }

        } else {
          this.tipo = 'paciente';
          this.aseguradoras = this.persona.listadoAseguradoras;
          this.dataSource = this.aseguradoras;
          if (p.tipoSeguro) {
            this.thirdFormGroup.get('tipoSeguro').setValue(p.tipoSeguro.toString());
          }
        }
        if (p.genero) {
          this.firstFormGroup.get('genero').setValue(p.genero.toString());
        }

        this.changeTipoPersona();
      }

    });

    /**VALIDACIONES DE LOS FORMULARIOS */
    this.firstFormGroup = this._formBuilder.group({
      nombre: ['', Validators.required],
      primerApellido: ['', Validators.required],
      NHC: ['', Validators.required],
      numColegiado: [''],
      NIF: [''],
      segundoApellido: [''],
      tipoProfesional: [''],
      genero: [''],
      fechaNacimiento: ['']
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
      profesional.genero = person.genero;
      profesional.fechaNacimiento = person.fechaNacimiento;

      if (direccion) {
        profesional.direccion = direccion;
      } else {
        profesional.direccion = {} as Direccion;
      }

      profesional.tipoProfesional = parseInt(person.tipoProfesional, 0);

      this.personService.createUsuario(profesional).subscribe((result) => {
        Swal.fire({
          icon: 'success',
          title: 'El profesional ha sido creado correctamente',
          showConfirmButton: false,
          timer: 1500
        }).then(r => {
          this.router.navigate(['users']);
        });
      });
    } else {
      const paciente = new Paciente();
      paciente.NHC = person.NHC;
      paciente.nombre = person.nombre;
      paciente.primerApellido = person.primerApellido;
      paciente.segundoApellido = person.segundoApellido;
      paciente.NIF = person.NIF;
      paciente.genero = person.genero;
      paciente.fechaNacimiento = person.fechaNacimiento;

      if (direccion) {
        paciente.direccion = direccion;
      } else {
        paciente.direccion = {} as Direccion;
      }

      paciente.listadoAseguradoras = this.aseguradoras;
      paciente.tipoSeguro = parseInt(person.tipoSeguro, 0);
      this.personService.createUsuario(paciente).subscribe((result) => {

        Swal.fire({
          icon: 'success',
          title: 'El paciente ha sido creado correctamente',
          showConfirmButton: false,
          timer: 1500
        }).then(r => {
          this.router.navigate(['users']);
        });
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
    this.dataSource = this.aseguradoras;
    this.thirdFormGroup.reset();
  }

  updatePerson() {
    this.persona.listadoAseguradoras = this.aseguradoras;
    this.personService.updateUsuario(this.persona).subscribe(r => {
      Swal.fire({
        icon: 'success',
        title: 'El usuario ha sido actualizado correctamente',
        showConfirmButton: false,
        timer: 1500
      }).then(r => {
        this.router.navigate(['users']);
      });
    })
  }

  getNameOfEnum(value) {
    return TipoSeguro[value];
  }

  eliminarAseguradora(numTarjeta) {
    this.aseguradoras = this.aseguradoras.filter(aseg =>
      aseg.numTarjeta != numTarjeta
    );
    this.dataSource = this.aseguradoras;
  }
}
