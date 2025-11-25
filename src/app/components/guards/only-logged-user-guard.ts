import { CanActivateChildFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth-service';

/**Revisa que la gente esté logeada */
export const onlyLoggedUserGuard: CanActivateChildFn = () => {
  const auth = inject(AuthService)
  const router = inject(Router)
  //Si no estoy logueado redirijo al usuario
  if (!auth.token) {
    router.navigate(['/'])
    return false;
  }
  return true;
};
