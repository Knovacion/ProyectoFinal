import { Injectable } from "@angular/core";
import { Respuesta } from "src/app/Models/respuesta";
import { HttpClient } from "@angular/common/http";
import { endPoitns, environment } from "../../../environments/environment";
import { Heroe } from "src/app/Models/heroe";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class VillanoService {
  constructor(private http: HttpClient) {}

  getHeroesByName(name: string): Observable<Respuesta> {
    return this.http.get<Respuesta>(
      endPoitns.hero + endPoitns.tkn + "/search/" + name.toString()
    );
  }

  getHeroesById(idHeroe: string): Observable<Heroe> {
    return this.http.get<Heroe>(endPoitns.hero + endPoitns.tkn + "/" + idHeroe);
  }
}
