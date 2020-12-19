import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Heroe } from "src/app/Models/heroe";
import { Respuesta } from "src/app/Models/respuesta";
import { endPoints, environment } from "../../../environments/environment";
@Injectable({
  providedIn: "root",
})
export class HeroesService {
  constructor(private http: HttpClient) {}

  getHeroesByName(name: string) {
    return this.http.get<Respuesta>(
      endPoints.hero + endPoints.tkn + "/search/" + name.toString()
    );
    //https://superheroapi.com/api/access-token/search/name
  }

  getCharactersById(id:number){
    return this.http.get<Heroe>(endPoints.heroId + endPoints.tkn+"/"+id);
    //https://www.superheroapi.com/api.php/10224783760840780/all.json
  }
  getAll()
  {
    return this.http.get<Heroe[]>("https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json")
  }
  getCharactersById2(name: string){
    return this.http.get<Respuesta>(endPoints.hero + endPoints.tkn + "/search/" + name.toString());
    //https://www.superheroapi.com/api.php/10224783760840780/all.json
  }
}
