import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LogoutComponent } from './components/logout/logout.component';
import { InspectionListComponent } from './components/inspection-list/inspection-list.component';
import { NewInspectionComponent } from './components/new-inspection/new-inspection.component';
import { AuthGuard } from './guards/auth.guard';  

const Routes : Routes = [
    { path: "", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "logout", component: LogoutComponent, canActivate: [AuthGuard] },
    { path: "inspection-list", component: InspectionListComponent, canActivate: [AuthGuard] },
    { path: "new-inspection", component: NewInspectionComponent, canActivate: [AuthGuard] }
]

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(Routes);
