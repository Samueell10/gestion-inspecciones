import { Component, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public logueado : boolean;
  public usuario : any;
  constructor(private auth : AuthService) {
    this.logueado = false
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
}