import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild("Email") Email! : ElementRef;
  @ViewChild("Password") Password! : ElementRef;

  constructor(private auth : AuthService, private _router : Router) { }

  ngOnInit(): void {
  }

  registro():void{
    var mail = this.Email.nativeElement.value;
    var contra = this.Password.nativeElement.value;
    this.auth.register(mail, contra).then(res=>{
      console.log(res);
      this._router.navigate(['perfil']);
    });
  }

}