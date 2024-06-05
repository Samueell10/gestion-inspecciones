import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public logueado : boolean;
  public usuario : any;
  constructor(private auth : AuthService, private _router : Router) {
    this.logueado = false;
  }

  ngOnInit(): void {
  this.usuarioLogueado();
  }

  usuarioLogueado(){
    this.auth.getUserLogin().subscribe(res=>{
      if(res != null){
        this.logueado = true;
        this.usuario = res;

      }
      else{
        this.logueado = false;
      }
     
    });
  }

logOut():void{
  this.auth.logout().then(res => {
    this.logueado = false;
    this._router.navigate(["/"]);
  });
}

}