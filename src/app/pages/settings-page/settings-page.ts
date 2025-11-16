import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RestaurantService } from '../../services/restaurant-service';
import { AuthService } from '../../services/auth-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-settings-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.scss',
})
export class SettingsPage {
  name: string = ''
  isLoading = false
  successMessage: string | null = null
  restaurantService = inject(RestaurantService)
  authService = inject(AuthService)
  id: string | null = this.restaurantService.getUserId()

  async changeName() {
    if (!this.name) return
    this.isLoading = true
    try {
      const updated = await this.restaurantService.updateRestaurantName(this.name)
      const swal = (window as any).Swal
      if (!updated) {
        if (swal && typeof swal.fire === 'function') {
          await swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo actualizar el nombre. Intenta nuevamente.' })
        }
        return
      }
      this.authService.logout()
    } catch (err) {
      console.error(err)
    } finally {
      this.isLoading = false
    }
  }
  deleteRestaurantModal(id: string | number) {
    Swal.fire({
      title: "¿Seguro que quieres eliminar tu restaurante?",
      showConfirmButton: false,
      showDenyButton: true,
      showCancelButton: true,
      denyButtonText: `Borrar`,
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isDenied) {
        this.restaurantService.deleteRestaurant(id)
        Swal.fire("Restaurante eliminado");
      }
    });
  }
}
