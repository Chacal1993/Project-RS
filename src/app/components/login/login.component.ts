import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/user';
import { NgModel, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PersonService } from 'src/app/services/person.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  ocultarContrasenna = true;
  usuario: Usuario;

  loginFormGroup: FormGroup;

  constructor(private router: Router, private serviceUser: PersonService, private formBuilder: FormBuilder) {
    this.usuario = {} as Usuario;
  }

  ngOnInit(): void {
    document.body.className = "mat-typography bg-body";
    document.getElementById('button-logout').style.display = 'none';

    /**VALIDACIONES DE LOS FORMULARIOS */
    this.loginFormGroup = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnDestroy() {
    document.body.className = "mat-typography";
    document.getElementById('button-logout').style.display = 'block';
  }

  signIn() {
    this.serviceUser.getUserByEmail(this.usuario).subscribe(result => {
      Swal.fire({
        icon: 'success',
        title: 'Bienvenido al sistema',
        showConfirmButton: false,
        timer: 3500
      });


      this.router.navigateByUrl('/users').then(() => {
        window.location.reload();
      });
      localStorage.setItem('user', JSON.stringify(this.usuario));
    },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Usuario incorrecto',
          text: 'Revise sus credenciales de acceso: ' + error['statusText'],
          showConfirmButton: false,
          timer: 1500
        })
      }
    );
  }

}
