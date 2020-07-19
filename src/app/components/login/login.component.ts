import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/user';
import { NgModel, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  nombreProfesional = 'profesional';
  contrasennaProfesional = '123';

  ocultarContrasenna = true;
  usuario: Usuario;

  constructor(private router: Router) {
    this.usuario = {} as Usuario;
  }

  ngOnInit(): void {
    document.body.className = "mat-typography bg-body";
  }

  ngOnDestroy() {
    document.body.className = "mat-typography";
  }

  signIn() {
    if (this.usuario.nombreUsuario === this.nombreProfesional && this.usuario.contrasena === this.contrasennaProfesional) {
      Swal.fire({
        icon: 'success',
        title: 'Bienvenido al sistema',
        showConfirmButton: false,
        timer: 1500
      }).then(result => {
        this.router.navigate(['/users']);
      })


    } else {
      Swal.fire({
        icon: 'error',
        title: 'Usuario incorrecto',
        text: 'Revise sus credenciales de acceso',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

}
