import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration(),
    provideFirebaseApp(() => initializeApp({"projectId":"prueba-tecnica-firebase","appId":"1:871432872140:web:9c791d008977ba1d28a269","storageBucket":"prueba-tecnica-firebase.appspot.com","apiKey":"AIzaSyAi8N31YGSEK1arD_5lqbEiwqRqJwCiUAI","authDomain":"prueba-tecnica-firebase.firebaseapp.com","messagingSenderId":"871432872140","measurementId":"G-LFR2TB2633"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
