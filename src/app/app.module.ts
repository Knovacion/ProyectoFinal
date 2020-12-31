import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./Header/header/header.component";
import { FooterComponent } from "./Footer/footer/footer.component";
import { HomeComponent } from "./Body/Home/home/home.component";
import { RegisterComponent } from "./Body/Register/register/register.component";
import { LoginComponent } from "./Body/Login/login/login.component";
import { ClickDirectiveDirective } from "./Directives/click-directive.directive";
import { HeroesComponent } from "./Body/Heroes/heroes/heroes.component";

import { VersusComponent } from "./Body/Versus/versus.component";

// FIREBASE
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";

import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from "src/environments/environment";

//Material
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatListModule } from "@angular/material/list";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import {MatButtonModule} from '@angular/material/button';
//Toastgit
import { ToastrModule } from "ngx-toastr";

//Directivas
import { MouseDirectiveDirective } from "./Directives/mouse-directive.directive";

//Infinite Scroll
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

import { VillanosComponent } from "./Body/Heroes/villanos/villanos.component";




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
    MouseDirectiveDirective,
    VersusComponent,
    VillanosComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
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
    ToastrModule.forRoot({ timeOut: 1000, preventDuplicates: true }),
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    InfiniteScrollModule,
    MatButtonModule
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
