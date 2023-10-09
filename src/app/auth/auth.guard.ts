import { CanActivateFn, Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { inject } from "@angular/core";


export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const afAuth = inject(AngularFireAuth);
  let usuariologado: any;
  afAuth.onAuthStateChanged((user): any => {

    if (user) {
      usuariologado = true;
    } else {
      router.navigate(['login'])
      usuariologado = false;
    }
  });
  return usuariologado;
}

export const authGuardLogado: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const afAuth = inject(AngularFireAuth);
  let usuariologado = true;
  afAuth.onAuthStateChanged((user): any => {

    if (!user) {
      usuariologado = true;
    } else {
      router.navigate(['pagina-inicial'])
      usuariologado = false;
    }
  });
  return usuariologado;
}