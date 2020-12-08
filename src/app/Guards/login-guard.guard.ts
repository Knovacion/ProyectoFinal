import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { FirestoreService } from "../Body/Services/firestore.service";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root",
})
export class LoginGuardGuard implements CanActivate {
  private usuarioLogueado: boolean;
  private router: Router;
  constructor(
    private FirestoreService: FirestoreService,
    private toastr: ToastrService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.FirestoreService.UsuarioLogueado()
      .then((resp) => {
        if (resp.uid != null) {
          this.usuarioLogueado = true;
          return this.usuarioLogueado;
        } else {
          this.usuarioLogueado = false;
          this.toastr.error(
            "Debe iniciar sesión para poder ingresar.",
            "Alerta"
          );
          this.router.navigate(["home"]);
        }
      })
      .catch((error) => {
        this.usuarioLogueado = false;
        this.toastr.error("Debe iniciar sesión para poder ingresar.", "Alerta");
        this.router.navigate(["home"]);
        return this.usuarioLogueado;
      });
    return this.usuarioLogueado;
  }
}
