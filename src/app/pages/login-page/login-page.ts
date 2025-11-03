import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [RouterModule, FormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  authService = inject(AuthService);
  errorLogin = false;
  isLoading = false;
  showPassword = false;

  router = inject(Router)

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async login(form: any) {
    this.errorLogin = false;
    if (!form.value.email || !form.value.password) {
      this.errorLogin = true;
      return;
    }
    this.isLoading = true;
    await this.authService.login(form.value);
    this.isLoading = false;
  }
}
