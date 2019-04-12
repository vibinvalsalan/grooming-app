import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  events: string[] = [];
  opened: boolean;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.opened = true;
  }

}
