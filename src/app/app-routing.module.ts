import { Component, NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HeroesComponent } from "./Body/Heroes/heroes/heroes.component";
import { VillanosComponent } from "./Body/Heroes/villanos/villanos.component";
import { HomeComponent } from "./Body/Home/home/home.component";
import { VersusComponent } from "./Body/Versus/versus.component";

// GUARD
import { LoginGuardGuard } from "./Guards/login-guard.guard";

const routes: Routes = [
  { path: "home", component: HomeComponent },
  {
    path: "heroes",
    component: HeroesComponent, canActivate: [LoginGuardGuard],
  },
  {
    path: "villanos",
    component: VillanosComponent,
    canActivate: [LoginGuardGuard],
  },
  {
    path: "versus",
    component: VersusComponent,
    canActivate: [LoginGuardGuard],
  },

  { path: "", redirectTo: "home", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
