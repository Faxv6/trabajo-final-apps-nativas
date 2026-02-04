import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RestaurantService } from '../../services/restaurant-service';


@Component({
  selector: 'app-register-page',
  imports: [RouterModule, FormsModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss'
})
export class RegisterPage {
  errorRegister = false;
  user = inject(RestaurantService);
  isLoading = false;
  router = inject(Router)

  async register(form: any) {
    this.errorRegister = false;
    
    // Validar que todos los campos requeridos estén presentes
    if (!form.firstName || !form.lastName || !form.restaurantName || 
        !form.address || !form.phoneNumber || !form.password || !form.password2) {
      this.errorRegister = true;
      return;
    }
    
    // Validar que las contraseñas coincidan
    if (form.password !== form.password2) {
      this.errorRegister = true;
      return;
    }
    
    this.isLoading = true;
    
    // Preparar datos sin password2 (solo para validación en el frontend)
    const userData = {
      firstName: form.firstName,
      lastName: form.lastName,
      restaurantName: form.restaurantName,
      address: form.address,
      phoneNumber: form.phoneNumber,
      password: form.password
    };
    
    const res = await this.user.register(userData);
    this.isLoading = false;
    
    // res.ok devuelve true si el codigo de estado HTTP (respuesta del servidor) es 2xx
    if (res.ok) {
      this.router.navigate(["/login"]);
    } else {
      this.errorRegister = true;
    }
  }
}
