import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { Home } from './pages/home/home';
import { RegisterPage } from './pages/register-page/register-page';

export const routes: Routes = [

    {
        path: "",
        component: Home
    },
        {
        path: "login",
        component: LoginPage
    },
        {
        path: "register",
        component: RegisterPage
    }

];
