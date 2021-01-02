import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { FirestoreService } from "../../Services/firestore.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor(
    private firestoreService: FirestoreService,
    private toastr: ToastrService
  ) {}

  @Output() envioParametro = new EventEmitter<string>();
  @Output() envioCorreo = new EventEmitter<string>();
  public uid: string;

  ngOnInit() {}

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

  public iniciarSesion() {
    this.firestoreService
      .IniciarSesion(
        this.loginForm.value.txtCorreo,
        this.loginForm.value.txtPass
      )
      .then((resp) => {
        // console.log(resp);

        if (
          resp.code == "undefined" ||
          resp.code == undefined ||
          resp.code == null
        ) {
          this.toastr.success(
            "Bienvenido " + this.loginForm.value.txtCorreo + ".",
            "Proceso correcto."
          );
          this.uid = resp.user.uid;
        } else {
          if (resp.code == "auth/wrong-password") {
            this.toastr.error("Usuario y/o contraseña incorrecta.", "Alerta");
          } else if (resp.code == "auth/user-not-found") {
            this.toastr.error("Usuario no registrado", "Alerta");
          } else if (resp.code == "auth/too-many-requests") {
            this.toastr.error(
              "Se ha bloqueado el usuario temporalmente, vuelva a intentarlo dentro de unos minuto.",
              "Alerta"
            );
          }
        }

        this.envioParametro.emit(this.uid);
        this.envioCorreo.emit(this.loginForm.value.txtCorreo);
      })
      .catch((resp) => {
        console.error(resp);
      });
  }

 

  //codigo formulario Reactivo
}
