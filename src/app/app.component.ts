import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Project-RS';

  constructor(private router: Router) {

  }

  logout() {
    localStorage.setItem('user', null);
    this.router.navigateByUrl('/login').then(() => {
      window.location.reload();
    });
  }
}
