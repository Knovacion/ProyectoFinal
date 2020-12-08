import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { FirestoreService } from "../../Services/firestore.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  public loginForm = new FormGroup({
    txtCorreo: new FormControl(""),
    txtPass: new FormControl(""),
  });
  constructor(private firestoreService: FirestoreService) {}

  ngOnInit() {}

  public iniciarSesion() {
    // alert(this.loginForm.value.txtCorreo + " " + this.loginForm.value.txtPass);

    this.firestoreService
      .IniciarSesion(
        this.loginForm.value.txtCorreo,
        this.loginForm.value.txtPass
      )
      .then((resp) => {
        console.log(resp);
      })
      .catch((resp) => {
        console.error(resp);
      });
  }

  //codigo formulario Reactivo
}
