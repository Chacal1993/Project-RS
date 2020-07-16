import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/user';
import { NgModel, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

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
  }

  signIn() {
    console.log(this.usuario);

    if (this.usuario.nombreUsuario === this.nombreProfesional && this.usuario.contrasena === this.contrasennaProfesional) {
      alert('Usuario loggeado con éxito');
      this.router.navigate(['/users']);

    } else {
      alert('Fallo al iniciar sesión');
    }
  }

}
