import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor() {}

  public inicioSesionCorrecto: boolean = false;
  public uid: string;
  public txtCorreo:string;
  ngOnInit() {
    console.log("uid", this.uid);
    this.uid = localStorage.getItem("uid");
    if (this.uid != undefined) {
      this.inicioSesionCorrecto = true;
    } else {
      this.inicioSesionCorrecto = false;
    }
  }

  reciboMail(email:string){
    this.txtCorreo = email;
    if(this.txtCorreo != undefined)
    {
      localStorage.setItem("email", this.txtCorreo)
    }
  }

  reciboUid(uidParam: string) {
    this.uid = uidParam;
    if (this.uid != undefined) {
      this.inicioSesionCorrecto = true;
      localStorage.setItem("uid", this.uid);
    } else {
      this.inicioSesionCorrecto = false;
    }
  }

  SesionIiniciada() {
    this.uid = localStorage.getItem("uid");
    if (this.uid != undefined) {
      return true;
    } else {
      return false;
    }
  }  
}