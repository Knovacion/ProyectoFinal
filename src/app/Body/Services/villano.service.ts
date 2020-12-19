import { Injectable } from "@angular/core";
import { Respuesta } from "src/app/Models/respuesta";
import { HttpClient } from "@angular/common/http";
import { endPoints, environment } from "../../../environments/environment";
import { Heroe } from "src/app/Models/heroe";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class VillanoService {
  constructor(private http: HttpClient) {}

  getHeroesByName(name: string): Observable<Respuesta> {
    return this.http.get<Respuesta>(
      endPoints.hero + endPoints.tkn + "/search/" + name.toString()
    );
  }

  getHeroesById(idHeroe: string): Observable<Heroe> {
    return this.http.get<Heroe>(endPoints.hero + endPoints.tkn + "/" + idHeroe);
  }

  getAll()
  {
    return this.http.get<Heroe[]>("https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json")
  }
}
