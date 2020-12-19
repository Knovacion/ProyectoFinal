import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { User } from "src/app/Interfaces/user";

@Injectable({
  providedIn: "root",
})
export class FirestoreService {
  constructor(private angularFireAuth: AngularFireAuth,private angularFirestore: AngularFirestore) {}

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
      const newUser = await this.angularFirestore.collection('users').add(data);
      console.log('newuser service -->', newUser);
      return newUser.id;
    } catch (error) {
      return error;
    }
  }
  async registerByUserEmail(email: string, pass: string){
    try {
      const respRegister = await this.angularFireAuth.auth.createUserWithEmailAndPassword(email, pass)
      return respRegister.user;
    } catch (error) {
      console.error('error register', error);
    }
  }
}
