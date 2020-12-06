import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./Header/header/header.component";
import { FooterComponent } from "./Footer/footer/footer.component";
import { HomeComponent } from "./Body/Home/home/home.component";
import { RegisterComponent } from "./Body/Register/register/register.component";
import { LoginComponent } from "./Body/Login/login/login.component";
import { ClickDirectiveDirective } from "./Directives/click-directive.directive";

// FIREBASE
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from "src/environments/environment";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ClickDirectiveDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
