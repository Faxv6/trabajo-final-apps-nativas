import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { Home } from './pages/home/home';
import { RegisterPage } from './pages/register-page/register-page';
import { onlyPublicUserGuard } from './components/guards/only-public-user-guard';
import { onlyLoggedUserGuard } from './components/guards/only-logged-user-guard';
import { LoggedLayout } from './components/logged-layout/logged-layout';
import { AdminPage } from './pages/admin-page/admin-page';
import { NewEditCategory } from './components/new-edit-category/new-edit-category';
import { SettingsPage } from './pages/settings-page/settings-page';
import { RestaurantPage } from './pages/restaurant-page/restaurant-page';
import { NewEditProduct } from './components/new-edit-products/new-edit-products';

export const routes: Routes = [

    {
        path: "login",
        component: LoginPage,
        canActivate: [onlyPublicUserGuard],
    },
    {
        path: "register",
        component: RegisterPage,
        canActivate: [onlyPublicUserGuard]
    },
    {
        path: "",
        component: LoggedLayout,
        children: [
            {
                path: "",
                component: Home
            },
            {
                path: "admin-page/:id",
                component: AdminPage,
                canActivate: [onlyLoggedUserGuard]
            },
            {
                path: "settings-page/:id",
                component: SettingsPage,
                canActivate: [onlyLoggedUserGuard]
            },
            {
                path: "new-category",
                component: NewEditCategory,
                canActivate: [onlyLoggedUserGuard]
            },
            {
                path: "edit-category/:id",
                component: NewEditCategory,
                canActivate: [onlyLoggedUserGuard]
            },
            {
                path: "restaurant/:id",
                component: RestaurantPage
            },
            {
                path: "edit-product/:id",
                component: NewEditProduct,
                canActivate: [onlyLoggedUserGuard]
            },
            {
                path: "new-product",
                component: NewEditProduct,
                canActivate: [onlyLoggedUserGuard]
            },
        ]
    },
];