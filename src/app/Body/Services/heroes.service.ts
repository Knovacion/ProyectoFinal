import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { endPoitns, environment } from "../../../environments/environment";
@Injectable({
  providedIn: "root",
})

export class HeroesService {
  constructor(private http: HttpClient) {}

  getHeroesByName(name:string) {
    return this.http.get(endPoitns.hero + endPoitns.tkn + '/search/' + name.toString());
    //https://superheroapi.com/api/access-token/search/name
  }
}
