import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { FirestoreService } from "../../Services/firestore.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  get correo() {
    return this.loginForm.get("txtCorreo");
  }

  get pass() {
    return this.loginForm.get("txtPass");
  }

  public loginForm = new FormGroup({
    txtCorreo: new FormControl("", [Validators.required, Validators.email]),
    txtPass: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  constructor(
    private firestoreService: FirestoreService
  ) {}

  ngOnInit() {}

  public iniciarSesion() {
    // alert(this.loginForm.value.txtCorreo + " " + this.loginForm.value.txtPass);

    this.firestoreService
      .IniciarSesion(
        this.loginForm.value.txtCorreo,
        this.loginForm.value.txtPass
      )
      .then((resp) => {
        console.log(resp.code);
        console.log(resp);

        if (resp.code == "undefined") {
          alert("Inicio de sesion correcto !!!!!!");
        } else {
          if (resp.code == "auth/wrong-password") {
            alert("Usuario y/o contraseña incorrecta.");
          } else if (resp.code == "auth/user-not-found") {
            alert("Usuario no registrado");
          } else if (resp.code == "auth/too-many-requests") {
            alert(
              "Se ha bloqueado el usuario temporalmente, vuelva a intentarlo dentro de un minuto."
            );
          }
        }
      })
      .catch((resp) => {
        console.error(resp);
      });
  }

  //codigo formulario Reactivo
}
