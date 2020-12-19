import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
import { User } from "src/app/Interfaces/user";
import { FirestoreService } from '../../Services/firestore.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  get email() {return this.registerForm.get('email')};
  get pass() {return this.registerForm.get('pass')};
  get name() {return this.registerForm.get('name')};
  public registerForm = new FormGroup({

    name: new FormControl('',[Validators.required, Validators.minLength(3)]),
    pass: new FormControl('',[Validators.required,Validators.minLength(6)]),
    email: new FormControl('',[Validators.required, Validators.email]),
    //uid:

  })



  constructor(private fireService :FirestoreService, private toast: ToastrService) { }

  ngOnInit() {
  }
// formulario reactivo conectar con FIREBASE**
// nombre
// correo
// contraseña
// IdUInico o token(?)


  registerUser()
  {
    this.fireService.registerByUserEmail(this.registerForm.value.email, this.registerForm.value.pass).then(resp => {
      const newRegisterBD: User = {
        name: this.registerForm.value.name,
        email: resp.email,
        emailVerified: resp.emailVerified,
        pass: this.registerForm.value.pass,
        uid: resp.uid
      }
      this.fireService.createUser(newRegisterBD).then(resp => {
        console.log('id new user -->', resp);
        this.toast.success("Usuario Registrado con exito")
      })
      console.log('register ok? -->', resp);
    }).catch(error => {
      console.log(error);
    })
  }

}
