import { CanActivateChildFn, RedirectCommand, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth-service';

/**Revisa que la gente esté logeada */
export const redirectToHomeLogged: CanActivateChildFn = (childRoute, state) => {
  const auth = inject(AuthService)
  const router = inject(Router)
  //Si estoy logueado redirijo al usuario
  if (auth.token) {
    const loginPath = router.parseUrl("/logged-layout");
    return new RedirectCommand(loginPath, {
      skipLocationChange: true,
    });
  }
  return true;
};
