import { Component, OnInit } from "@angular/core";
import { FirestoreService } from "../../Body/Services/firestore.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  constructor(
    private firestoreService: FirestoreService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  public uid: string;
  ngOnInit() {}

  public CerrarSesion() {
    this.firestoreService
      .CerrarSesion()
      .then((resp) => {
        if (resp == true) {
          this.toastr.success(
            "Se ha cerrado la sesión correctamente.",
            "Proceso Correcto"
          );
          localStorage.clear();
          this.router.navigate(["home"]).then((resp) => {
            if (resp == null) {
              window.location.reload();
            }
          });
         

          // window.location.reload();
          // window.location.reload();
        } else {
          this.toastr.success(
            "No se ha podido cerrar sesión, intentelo nuevamente.",
            "Alerta"
          );
        }
      })
      .catch((resp) => {
        this.toastr.success(
          "No se ha podido cerrar sesión, intentelo nuevamente.",
          "Alerta"
        );
      });
  }

  btnCerrarSesionClass() {
    this.uid = localStorage.getItem("uid");
    if (this.uid == undefined) {
      return true;
    } else {
      return false;
    }
  }
}
