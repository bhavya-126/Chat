import { Routes } from "@angular/router";
import { LogInComponent } from "./log-in/log-in.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { HomeComponent } from "./home/home.component";
import { AuthGuardService } from "./guards/auth-guard.service";
import { ProfileComponent } from "./profile/profile.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { ChatComponent } from "./home/chat/chat.component";

export const routes:Routes = [
    {path:'', redirectTo:"Home", pathMatch:"full"},
    {path:'Home', component:HomeComponent, canActivate:[AuthGuardService], children:[
        {path:'Chat', component:ChatComponent}
    ]},
    {path:"LogIn", component:LogInComponent},
    {path:"ForgotPassword", component:ForgotPasswordComponent},
    {path:'ResetPassword', component:ResetPasswordComponent, canActivate:[AuthGuardService]},
    {path:"Profile", component:ProfileComponent, canActivate:[AuthGuardService]},
    {path:"ChangePassword", component:ChangePasswordComponent, canActivate:[AuthGuardService]},
    {path:"**", component:PageNotFoundComponent},
]