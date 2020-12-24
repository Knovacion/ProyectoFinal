import { stringify } from "@angular/compiler/src/util";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { promise } from "protractor";
import { Observable } from "rxjs";
import { User } from "src/app/Interfaces/user";
import { Favoritos } from "../../Interfaces/favoritos";

@Injectable({
  providedIn: "root",
})
export class FirestoreService {
  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore
  ) {}

  public lstFavoritos: Favoritos[] = [];
  public objFavorito: any;

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

  async UsuarioLogueado() {
    try {
      const currentUser = await this.angularFireAuth.auth.currentUser;
      return currentUser;
    } catch (error) {
      return error;
    }
  }

  async CerrarSesion() {
    try {
      const respuesta = await this.angularFireAuth.auth.signOut();

      return true;
    } catch (error) {
      return false;
    }
  }
  async createUser(data: User): Promise<any> {
    try {
      const newUser = await this.angularFirestore.collection("users").add(data);
      console.log("newuser service -->", newUser);
      return newUser.id;
    } catch (error) {
      return error;
    }
  }
  async registerByUserEmail(email: string, pass: string) {
    try {
      const respRegister = await this.angularFireAuth.auth.createUserWithEmailAndPassword(
        email,
        pass
      );
      return respRegister.user;
    } catch (error) {
      console.error("error register", error);
    }
  }

  async registerFavoritos(data: Favoritos): Promise<any> {
    try {
      const favorito = await this.angularFirestore
        .collection("Favoritos")
        .add(data);
      // console.log(data);
      return data;
    } catch (error) {
      return error;
    }
  }

  // async deleteFavorito(data: Favoritos): Promise<any> {
  //   try {
  //     const favorito = await this.angularFirestore
  //       .collection("Favoritos")
  //       .();
  //     return data;
  //   } catch (error) {
  //     return error;
  //   }
  // }
  async getFavoritos(uid: string): Promise<Favoritos[]> {
    try {
      const RespFav = await this.angularFirestore.firestore
        .collection("Favoritos")
        .where("uid", "==", uid)
        .get()
        .then((respuesta) => {
          respuesta.forEach((resp) => {
            this.objFavorito = resp.data();

            this.lstFavoritos.push(this.objFavorito);
          });
        });
      return this.lstFavoritos;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getFavoritosDelete(uid: string, idHeroe: string): Promise<string> {
    try {
      let documento: string = "";
      const RespFav = await this.angularFirestore.firestore
        .collection("Favoritos")
        .where("uid", "==", uid)
        .where("idHeroe", "==", idHeroe)
        .get()
        .then((respuesta) => {
          respuesta.forEach((resp) => {
            // console.log(resp.id);
            documento = resp.id;
          });
        });
      return documento;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async deleteFavoritos(idDocumento: string): Promise<boolean> {
    try {
      const favorito = await this.angularFirestore
        .collection("Favoritos")
        .doc(idDocumento)
        .delete()
        .then((resp) => {
          // console.log(resp);
        });
      // console.log(data);
      return true;
    } catch (error) {
      return false;
    }
  }
}
