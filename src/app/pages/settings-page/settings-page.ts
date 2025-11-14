import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RestaurantService } from '../../services/restaurant-service';
import { AuthService } from '../../services/auth-service';

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

  async delete(id: string | number) {
  }
}
