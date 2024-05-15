import { Routes } from "@angular/router";
import { LogInComponent } from "./log-in/log-in.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";

export const routes:Routes = [
    {path:'', redirectTo:"LogIn", pathMatch:"full"},
    {path:"LogIn", component:LogInComponent},
    {path:"ForgotPassword", component:ForgotPasswordComponent},
    {path:'ResetPassword', component:ResetPasswordComponent},
    {path:"**", component:PageNotFoundComponent},
]