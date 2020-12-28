import { FormGroup, FormControl } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Heroe } from "src/app/Models/heroe";
import { Respuesta } from "src/app/Models/respuesta";
import { HeroesService } from "../../Services/heroes.service";
import { runInThisContext } from "vm";

@Component({
  selector: "app-heroes",
  templateUrl: "./heroes.component.html",
  styleUrls: ["./heroes.component.css"],
})
export class HeroesComponent implements OnInit {
  constructor(public heroApi: HeroesService) {}

  public data: any;
  public heroe: Heroe = new Heroe();
  public heroes: Heroe[] = [];
  public panelOpenState = false;
  public contenedor: any = "";
  public spliter = [];
  public flag: boolean;
  public page: number = 0;
  public SearchForm = new FormGroup({
    txtSearch: new FormControl(""),
  });

  ngOnInit() {
    this.goToPage();
  }

  onKey(event: any) {
    // without type info
    this.searchByName();
  }

  splitterFunction(slp: any) {
    let receptor = [];
    receptor = slp.split(",");

    this.spliter = receptor;
    return this.spliter;
  }

  //Función para pasar de página
  //Esta función se ejecuta cada vez que se desencadena
  //un evento sobre el componente hijo (app-pagination)
  goToPage() {
    this.getHeroesPages();
    this.flag = false;
  }

  //Este método llama al servicio dónde se obtiene el listado de tiendas
  //Recibe una página concreta
  getHeroesPages() {
    this.heroApi.getAll().subscribe((res) => {
      this.processHeroArray(res, 15);
    });
  }

  siguiente() {
    let next: number = this.page + 15;
    this.flag = true;
    this.getAllHeroes(next);
  }
  getAllHeroes(p: number) {
    this.heroApi.getAll().subscribe((res) => {
      this.processHeroArray(res, p);
    });
  }

  processHeroArray(heroArr: Heroe[], pages: number) {
    for (let i = 0; i <= pages; i++) {
      const ele = heroArr[i];
      if (this.heroes.length <= pages) {
        if (ele.biography.alignment.toLowerCase() == "good") {
          this.heroe = new Heroe();
          this.contenedor = "";
          this.heroe.id = ele.id;
          this.heroe.images =
            ele.images === undefined ? ele.image["url"] : ele.images["md"];
          this.heroe.name = ele.name;
          this.heroe.appearance = ele.appearance;
          this.heroe.appearance.eyecolor = ele.appearance["eye-color"];
          this.heroe.appearance.gender = ele.appearance["gender"];
          this.heroe.appearance.haircolor = ele.appearance["hair-color"];
          this.heroe.appearance.height = ele.appearance["height"];
          this.heroe.appearance.race = ele.appearance["race"];
          this.heroe.appearance.weight = ele.appearance["weight"];
          this.heroe.biography = ele.biography;
          this.heroe.biography.fullname = ele.biography["full-name"];
          this.heroe.biography.aliases = ele.biography["aliases"];
          this.heroe.biography.alignment = ele.biography["alignment"];

          this.heroe.biography.alteregos = ele.biography["alter-egos"];
          this.heroe.biography.firstappearance =
            ele.biography["first-appearance"];
          this.heroe.biography.placeofbirth = ele.biography["place-of-birth"];
          this.heroe.biography.publisher = ele.biography["publisher"];
          this.heroe.connections = ele.connections;

          this.heroe.connections.groupAffiliation =
            this.heroe.connections["groupAffiliation"] === undefined
              ? this.splitterFunction(
                  this.heroe.connections["group-affiliation"]
                )
              : this.splitterFunction(
                  this.heroe.connections["groupAffiliation"]
                );
          this.heroe.connections.relatives = ele.connections["relatives"];

          this.heroe.powerstats = ele.powerstats;
          this.heroe.powerstats.combat = ele.powerstats.combat;
          this.heroe.powerstats.durability = ele.powerstats.durability;
          this.heroe.powerstats.intelligence = ele.powerstats.intelligence;
          this.heroe.powerstats.power = ele.powerstats.power;
          this.heroe.powerstats.speed = ele.powerstats.speed;
          this.heroe.powerstats.strength = ele.powerstats.strength;
          this.heroe.work = ele.work;
          this.heroe.work.base = ele.work.base;
          this.heroe.work.occupation = ele.work.occupation;
          this.contenedor = ele.biography["aliases"];
          this.heroes.push(this.heroe);
        } else {
          pages++;
        }
      }
      this.page = pages;
    }
    if (this.flag == true) {
      console.log("largo here antes splice", this.heroes.length);
      this.heroes.splice(0, this.page - 15);
      console.log("largo here despues splice", this.heroes.length);
      console.log("if", this.heroes);
      this.page =0;
    }

    // console.log(this.heroes.lastIndexOf())
    console.log("heroes length", this.heroes.length);
    return this.heroes;
  }
  searchByName() {
    this.getHeroByName(this.SearchForm.value.txtSearch);
  }

  getHeroByName(hero: string) {
    let he: string = hero;
    let rd: Respuesta = new Respuesta();
    rd.results = [];
    let re = rd.results;

    this.heroApi.getHeroesByName(he).subscribe((res) => {
      re = res.results;
      if (re.length > 1) {
        this.heroes = [];
        this.processHeroArray(re, 1);
      } else if ((re.length = 1)) {
        this.heroes = [];
        this.processHeroArray(re, 1);
      }
    });
  }
}
