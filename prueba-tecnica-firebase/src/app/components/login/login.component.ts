import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild("Email") Email! : ElementRef;
  @ViewChild("Password") Password! : ElementRef;

  constructor(private auth : AuthService, private _router: Router) { }

  ngOnInit(): void {
  }

  logIn():void{
    var Email = this.Email.nativeElement.value;
    var Pass = this.Password.nativeElement.value;
    this.auth.login(Email, Pass).then(res=> {
      console.log(res);
      this._router.navigate(['new-inspection']);
    });
  }

  logInGoogle():void{
    var Email = this.Email.nativeElement.value;
    var Pass = this.Password.nativeElement.value;
    this.auth.loginWithGoogle(Email, Pass).then(res=>{
      console.log(res);
      this._router.navigate(['inspection-list']);
    });
  }
}