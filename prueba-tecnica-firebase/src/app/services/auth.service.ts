import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';	
import firebase from "@firebase/app-compat";


@Injectable()

export class AuthService {
  constructor(private Auth: AngularFireAuth ) {}

  // Sign up with email/password
  async register(email: string, password: string){
    try{
      return await this.Auth.createUserWithEmailAndPassword(email, password);
    }
    catch(error){
      alert("No se ha podido hacer el registro correctamente. Error: " + error)
      console.log("No se ha podido hacer el registro correctamente. Error: " + error);
      return null;  
    }
  }

  // Sign in with email/password
  async login(email: string, password: string){
    try{
      return await this.Auth.signInWithEmailAndPassword(email, password);
    }
    catch(error){
      alert("No se ha podido hacer el log-in correctamente. Error: " + error)
      console.log("No se ha podido hacer el log-in correctamente. Error: " + error);
      return null;  
    }
  }

  // Sign out
  async logout() {
    return this.Auth.signOut();
  }

  async loginWithGoogle(email: string, password: string) {
    try{
    return await this.Auth.signInWithPopup( new firebase.auth.GoogleAuthProvider());
  }
  catch(error){
    alert("No se ha podido hacer el log-in correctamente. Error: " + error)
    console.log("No se ha podido hacer el log-in correctamente. Error: " + error);
    return null;  }
}

  getUserLogin(){
    return this.Auth.authState;
}


}
  
