import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { LogoutComponent } from './components/logout/logout.component';

const Routes : Routes = [
    {path : "", component : LoginComponent},
    {path : "register", component : RegisterComponent},
    {path : "perfil", component : PerfilComponent},
    {path: "logout", component : LogoutComponent},

]

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(Routes);