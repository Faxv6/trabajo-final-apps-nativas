import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

/**Revisa que la gente no esté logeada */
export const onlyPublicUserGuard: CanActivateFn = () => {
  const auth = inject(AuthService)
  const router = inject(Router)
  if (auth.token) {
    router.navigate(['/'])
    return false;
  }
  return true;
};
