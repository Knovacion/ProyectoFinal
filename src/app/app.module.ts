import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import {CommonModule} from '@angular/common'
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./Header/header/header.component";
import { FooterComponent } from "./Footer/footer/footer.component";
import { HomeComponent } from "./Body/Home/home/home.component";
import { RegisterComponent } from "./Body/Register/register/register.component";
import { LoginComponent } from "./Body/Login/login/login.component";
import { ClickDirectiveDirective } from "./Directives/click-directive.directive";
import { HeroesComponent } from "./Body/Heroes/heroes/heroes.component";
import { VillanosComponent } from "./Body/Heroes/villanos/villanos.component";

// FIREBASE
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from "src/environments/environment";

//Material
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {  MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import{ReactiveFormsModule} from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';

//Toastgit 
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ClickDirectiveDirective,
    HeroesComponent,
    VillanosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatIconModule,
    MatCardModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatListModule,
    MatDividerModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
