import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: "root",
})
export class FirestoreService {
  constructor(private angularFireAuth: AngularFireAuth) {}

  async IniciarSesion(txtCorreo: string, txtPass: string) {
    try {
      const respuesta = await this.angularFireAuth.auth.signInWithEmailAndPassword(
        txtCorreo,
        txtPass
      );

      return respuesta;
    } catch (err) {
      return err;
    }
  }
}
