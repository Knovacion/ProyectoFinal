import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Respuesta } from "src/app/Models/respuesta";
import { endPoitns, environment } from "../../../environments/environment";
@Injectable({
  providedIn: "root",
})
export class HeroesService {
  constructor(private http: HttpClient) {}

  getHeroesByName(name: string) {
    return this.http.get<Respuesta>(
      endPoitns.hero + endPoitns.tkn + "/search/" + name.toString()
    );
    //https://superheroapi.com/api/access-token/search/name
  }
}
