import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Profesional } from 'src/app/models/profesional';
import { Paciente, TipoSeguro } from 'src/app/models/paciente';
import { Direccion } from 'src/app/models/direccion';
import { Aseguradora } from 'src/app/models/aseguradora';
import { PersonService } from 'src/app/services/person.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Persons } from 'src/app/models/persons';

@Component({
  selector: 'app-edit-new',
  templateUrl: './edit-new.component.html',
  styleUrls: ['./edit-new.component.scss']
})
export class EditNewComponent implements OnInit {
  idPersona: string;
  persona: Persons;
  tempPaciente: Paciente;
  tempProfesional: Profesional;
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
    this.persona = new Persons();
    this.persona.direccion = new Direccion('', '', '', '', '');
    this.tempPaciente = new Paciente();
    this.tempProfesional = new Profesional();
    this.aseguradoras = [];
    this.isEdit = false;
    this.idPersona = "";
  }

  ngOnInit() {
    this.getPersonById();

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

  recogerParametro() {
    this.route.paramMap.subscribe((parametros) => {
      this.idPersona = parametros['params']['user_id'];
    });
  }

  getPersonById() {
    /**OBTENER ID QUE PASA POR PARAMETRO */
    this.recogerParametro();

    /**BUSCAR PERSONA POR ID */
    if (this.idPersona !== null && !this.idPersona.startsWith(" ")) {
      this.personService.getProfesionalById(this.idPersona).subscribe(pr => {
        if (pr !== null) {
          this.isEdit = true;
          this.persona = pr as Persons;
          this.tempProfesional = pr;
          this.tipo = 'profesional';
          if (pr.tipoProfesional) {
            this.firstFormGroup.get('tipoProfesional').setValue(pr.tipoProfesional.toString());
          }
          if (pr.genero) {
            this.firstFormGroup.get('genero').setValue(pr.genero.toString());
          }
        } else {
          this.personService.getPacienteById(this.idPersona).subscribe(pa => {
            if (pa !== null) {
              this.isEdit = true;
              this.persona = pa as Persons;
              this.tempPaciente = pa;
              this.aseguradoras = pa.listadoAseguradoras;
              this.dataSource = this.aseguradoras;
              if (pa.tipoSeguro) {
                this.thirdFormGroup.get('tipoSeguro').setValue(pa.tipoSeguro.toString());
              }
              if (pa.genero != null) {
                this.firstFormGroup.get('genero').setValue(pa.genero.toString());
              }
            }
          });
        }

        this.changeTipoPersona();
      });
    }
  }

  addPerson(person, direccion) {
    if (this.tipo === 'profesional') {
      const profesional = new Profesional();
      profesional.numColegiado = this.tempProfesional.numColegiado;

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

      this.personService.createProfesional(profesional).subscribe((result) => {
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
      paciente.NHC = this.tempPaciente.NHC;
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
      this.personService.createPaciente(paciente).subscribe((result) => {
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
    this.dataSource = [...this.aseguradoras];
    this.thirdFormGroup.reset();
  }

  updatePerson(formularioDatosPersonales) {
    if (formularioDatosPersonales.valid) {
      this.persona.genero = formularioDatosPersonales.value.genero;
      if (this.tipo === 'profesional') {
        (this.persona as Profesional).tipoProfesional = parseInt(formularioDatosPersonales.value.tipoProfesional, 0);
        (this.persona as Profesional).numColegiado = this.tempProfesional.numColegiado;

        delete this.persona['listadoAseguradoras'];
        delete this.persona['NHC'];

        this.personService.updateProfesional(this.idPersona, this.persona as Profesional).subscribe(pr => {
          if (pr['updProf'] === null) {
            this.personService.createProfesional(this.persona as Profesional).subscribe(r => {
              this.personService.deletePaciente(this.idPersona).subscribe(re => {
              });
            });
          }
          Swal.fire({
            icon: 'success',
            title: 'El usuario ha sido actualizado correctamente',
            showConfirmButton: false,
            timer: 1500
          }).then(r => {
            this.router.navigate(['users']);
          });
        })
        //
      } else {
        (this.persona as Paciente).listadoAseguradoras = this.aseguradoras;
        (this.persona as Paciente).NHC = this.tempPaciente.NHC;

        delete this.persona['tipoProfesional'];
        delete this.persona['numColegiado'];

        this.personService.updatePaciente(this.idPersona, this.persona as Paciente).subscribe(pa => {
          if (pa['updPac'] === null) {
            this.personService.createPaciente(this.persona as Paciente).subscribe(r => {
              this.personService.deleteProfesional(this.idPersona).subscribe(r => {
              })
            })
          }

          Swal.fire({
            icon: 'success',
            title: 'El usuario ha sido actualizado correctamente',
            showConfirmButton: false,
            timer: 1500
          }).then(r => {
            this.router.navigate(['users']);
          });
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Hay campos requeridos sin rellenar',
        showConfirmButton: false,
        timer: 1500
      });
    }

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
