import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  opened: boolean;
  title = 'grooming-app';
  constructor(private auth: AuthService, private router: Router) {

  }
  ngOnInit() {
  this.auth.GetRole(). subscribe( res => {
    if (!this.auth.isLoggedIn) {
      this.router.navigateByUrl('/401');
      sessionStorage.clear();
    }
    console.log(res);
     }, error => {
        sessionStorage.clear();
        console.log('error');
       });
  }
}
