import { FormGroup, FormControl } from "@angular/forms";
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
  public allHeroes:Heroe[] = []; 
  public panelOpenState = false;
  public contenedor:any = Object;
  public spliter = [];


  public SearchForm = new FormGroup({
    txtSearch: new FormControl("", ),
  });


  ngOnInit() {
     this.getAllHeroes();
  }


  splitterFunction(slp:string){
    let receptor = []
    receptor = slp.split(",");
    this.spliter = receptor;   
    return this.spliter;
  }
  getAllHeroes()
  {
    let total:number = 731;
    try {
      for (let i = 0; i < total; i++) {
       this.heroApi.getCharactersById(i).subscribe(res=> 
        {
          if(res.biography.alignment.toLowerCase() == "good")
          {
            this.allHeroes.push(res)
          }
        })
      }
      console.log("Heroes",this.allHeroes);
    } catch (error) {
      console.log("error", error);
    }
  }

  processHeroArray(heroArr: Heroe[]){

    for (let i = 0; i < heroArr.length; i++) {
      const ele = heroArr[i];
      this.heroe = new Heroe;
      this.heroe.id = ele.id;        
      this.heroe.image = ele.image["url"];
      this.heroe.name= ele.name;
      this.heroe.appearance =ele.appearance;
      this.heroe.appearance.eyecolor =ele.appearance["eye-color"];
      this.heroe.appearance.gender =ele.appearance["gender"];
      this.heroe.appearance.haircolor =ele.appearance["hair-color"];
      this.heroe.appearance.height =ele.appearance["height"];
      this.heroe.appearance.race =ele.appearance["race"];
      this.heroe.appearance.weight =ele.appearance["weight"];
      this.heroe.biography = ele.biography;
      this.heroe.biography.fullname = ele.biography["full-name"];
      this.heroe.biography.aliases = ele.biography["aliases"];
      this.heroe.biography.alignment = ele.biography["alignment"];
      
      this.heroe.biography.alteregos = ele.biography["alter-egos"];
      this.heroe.biography.firstappearance = ele.biography["first-appearance"];
      this.heroe.biography.placeofbirth = ele.biography["place-of-birth"];
      this.heroe.biography.publisher = ele.biography["publisher"];
      this.heroe.connections = ele.connections;
      
      this.heroe.connections.groupaffiliation = this.splitterFunction(ele.connections["group-affiliation"]);
      this.heroe.connections.relatives =  ele.connections["relatives"];

      this.heroe.powerstats = ele.powerstats;
      this.heroe.powerstats.combat = ele.powerstats.combat;
      this.heroe.powerstats.durability = ele.powerstats.durability;
      this.heroe.powerstats.intelligence = ele.powerstats.intelligence;
      this.heroe.powerstats.power = ele.powerstats.power;
      this.heroe.powerstats.speed = ele.powerstats.speed;
      this.heroe.powerstats.strength = ele.powerstats.strength;
      this.heroe.work = ele.work;
      this.heroe.work.base = ele.work.base;
      this.heroe.work.occupation = ele.work.occupation
      this.contenedor = ele.biography["aliases"];      
      this.heroes.push(this.heroe); 
    }
    return this.heroes;
  }
   searchByName()
   {
     this.getHeroByName(this.SearchForm.value.txtSearch)

   }

  getHeroByName(hero:string) {

    let he:string = hero;
    let rd: Respuesta = new Respuesta;
    rd.results = [];
    let re = rd.results 
    
    this.heroApi.getHeroesByName(he).subscribe((res) => {
      re= res.results;
      if(re.length > 1)
      {
        this.processHeroArray(re);
      }
      else if(re.length=1)
      {
        this.processHeroArray(re);
      }
    });
  }
}
