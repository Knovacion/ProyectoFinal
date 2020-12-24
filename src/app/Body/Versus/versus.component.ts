import { Component, OnInit } from "@angular/core";
import { Heroe } from "src/app/Models/heroe";
import { HeroesService } from "../Services/heroes.service";

@Component({
  selector: "app-versus",
  templateUrl: "./versus.component.html",
  styleUrls: ["./versus.component.css"],
})
export class VersusComponent implements OnInit {
  public heroes: Heroe[] = [];
  public contenedor: any = "";
  public allHeroes: Heroe[] = [];
  public allVillans: Heroe[] = [];
  public idVillan: number = 0;
  public idHeroe: number = 0;
  public heroe: Heroe = new Heroe();
  public villan: Heroe = new Heroe();
  public spliter = [];
  public flag: boolean = false;
  public flag2: boolean = false;
  public poderTotalH: number = 0;
  public poderTotalV: number = 0;

  constructor(public heroApi: HeroesService) {}

  ngOnInit() {
    this.getAllCharacters();
  }
  getAllCharacters() {
    this.allHeroes = [];
    this.allVillans = [];
    this.heroApi.getAll().subscribe((res) => {
      res.forEach((ele) => {
        if (ele.biography.alignment.toLowerCase() == "good") {
          this.allHeroes.push(ele);
        } else {
          this.allVillans.push(ele);
        }
      });
    });
    console.log("Heroes", this.allHeroes);
    console.log("Villanos", this.allVillans);
  }

  heroeSelect(event) {
    this.idHeroe = event;
    console.log(this.idHeroe);
    this.getHeroe(this.idHeroe);
  }

  villanSelect(event) {
    this.idVillan = event;
    console.log(this.idVillan);
    this.getVillan(this.idVillan);
  }

  splitterFunction(slp: string) {
    let receptor = [];
    receptor = slp.split(",");
    this.spliter = receptor;
    console.log("Dimelo kurko", this.spliter);
    return this.spliter;
  }
  getHeroe(id: number) {
    this.heroApi.getCharactersById(id).subscribe((res) => {
      this.heroe = new Heroe();
      this.heroe.id = res.id;
      this.heroe.images = res.image["url"];
      this.heroe.name = res.name;

      this.heroe.biography = res.biography;
      this.heroe.biography.fullname = res.biography["fullname"];

      this.heroe.powerstats = res.powerstats;
      this.heroe.powerstats.combat = res.powerstats.combat;
      this.heroe.powerstats.durability = res.powerstats.durability;
      this.heroe.powerstats.intelligence = res.powerstats.intelligence;
      this.heroe.powerstats.power = res.powerstats.power;
      this.heroe.powerstats.speed = res.powerstats.speed;
      this.heroe.powerstats.strength = res.powerstats.strength;

      console.log(this.heroe);

      console.log(typeof this.heroe.powerstats.combat);
      this.poderTotalH =
        this.heroe.powerstats.combat +
        this.heroe.powerstats.durability +
        this.heroe.powerstats.intelligence +
        this.heroe.powerstats.power +
        this.heroe.powerstats.speed +
        this.heroe.powerstats.strength;

      this.flag = true;
    });
  }

  getVillan(id: number) {
    this.heroApi.getCharactersById(id).subscribe((res) => {
      this.villan = new Heroe();
      this.villan.id = res.id;
      this.villan.images = res.image["url"];
      this.villan.name = res.name;

      this.villan.biography = res.biography;
      this.villan.biography.fullname = res.biography["full-name"];

      this.villan.powerstats = res.powerstats;
      this.villan.powerstats.combat = res.powerstats.combat;
      this.villan.powerstats.durability = res.powerstats.durability;
      this.villan.powerstats.intelligence = res.powerstats.intelligence;
      this.villan.powerstats.power = res.powerstats.power;
      this.villan.powerstats.speed = res.powerstats.speed;
      this.villan.powerstats.strength = res.powerstats.strength;

      console.log(this.villan);
      this.poderTotalV =
        this.villan.powerstats.combat +
        this.villan.powerstats.durability +
        this.villan.powerstats.intelligence +
        this.villan.powerstats.power +
        this.villan.powerstats.speed +
        this.villan.powerstats.strength;
      this.flag2 = true;
    });
  }
}
