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
 
  public heroe: Heroe = new Heroe;
  public heroes: Heroe[] = [];
  public panelOpenState = false;


  ngOnInit() {
    this.getHeroByName();
  }


  getHeroByName() {
    let he:string = "ironman";
    let rd: Respuesta = new Respuesta;
    rd.results = [];
    let re = rd.results 
    
    this.heroApi.getHeroesByName(he).subscribe((res) => {
      re= res.results;
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
        this.heroe.appearance.eyecolor =re[0].appearance["eye-color"]
        this.heroe.appearance.gender =re[0].appearance["gender"]
        this.heroe.appearance.haircolor =re[0].appearance["hair-color"]
        this.heroe.appearance.height =re[0].appearance["height"]
        this.heroe.appearance.race =re[0].appearance["race"]
        this.heroe.appearance.weight =re[0].appearance["weight"]
        this.heroe.biography = re[0].biography;
        this.heroe.biography.fullname = re[0].biography["full-name"]
        this.heroe.biography.aliases = re[0].biography["aliases"]
        this.heroe.biography.alignment = re[0].biography["alignment"]
        this.heroe.biography.alteregos = re[0].biography["alter-egos"]
        this.heroe.biography.firstappearance = re[0].biography["first-appearance"]
        this.heroe.biography.placeofbirth = re[0].biography["place-of-birth"]
        this.heroe.biography.publisher = re[0].biography["publisher"]
        this.heroe.connections = re[0].connections;
        this.heroe.image = re[0].image;
        this.heroe.name= re[0].name;
        this.heroe.powerstats = re[0].powerstats;
        this.heroe.work = re[0].work;
    
        

      }
      console.log(re[0])
      console.log("bio",re[0].biography["full-name"])
     
    });
  }
}
