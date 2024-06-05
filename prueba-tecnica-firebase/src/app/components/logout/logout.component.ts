import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private auth : AuthService, private _router : Router) { }

  ngOnInit(): void {
  }

  logOut(){
    this.auth.logout();
    console.log("Saliendo...");
    this._router.navigate(["/"]);
  }
}