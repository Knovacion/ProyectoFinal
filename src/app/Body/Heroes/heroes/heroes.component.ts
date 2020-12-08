import { R3DelegatedFactoryMetadata } from '@angular/compiler/src/render3/r3_factory';
import { Component, OnInit } from "@angular/core";
import { Heroe } from 'src/app/Models/heroe';
import { Respuesta } from 'src/app/Models/respuesta';
import { HeroesService } from "../../Services/heroes.service";

@Component({
  selector: "app-heroes",
  templateUrl: "./heroes.component.html",
  styleUrls: ["./heroes.component.css"],
})
export class HeroesComponent implements OnInit {
  constructor(public heroApi: HeroesService) {}
 
  heroe: Heroe = new Heroe;
  heroes: Heroe[] = [];
  ngOnInit() {
    this.getHeroByName();
  }
  getHeroByName() {
    let he:string = "ironman";
    let rd: Respuesta = new Respuesta;
    rd.results = [];
    let re = rd.results 
    
    this.heroApi.getHeroesByName(he).subscribe((res) => {
      console.log(res.results);
      console.log(res);
      re= res.results;
      console.log("largo array",re.length);
      if(re.length > 1)
      {
        console.log("if")
        re.forEach(ele => {
          this.heroes.push(ele)
        });
      }
      else if(re.length=1)
      {
        console.log("else if")
        this.heroe.id = re[0].id;
        this.heroe.appearance =re[0].appearance;
        this.heroe.biography = re[0].biography;
        this.heroe.connections = re[0].connections;
        this.heroe.image = re[0].image;
        this.heroe.name= re[0].name;
        this.heroe.powerstats = re[0].powerstats;
        this.heroe.work = re[0].work;
    
        

      }
      console.log(re[0].image)
      console.log(re[0].biography["full-name"])
     
    });
  }
}
