import { Component, OnInit } from "@angular/core";
import { Heroe } from "src/app/Models/heroe";
import { Respuesta } from "src/app/Models/respuesta";
import { VillanoService } from "../../Services/villano.service";

@Component({
  selector: "app-villanos",
  templateUrl: "./villanos.component.html",
  styleUrls: ["./villanos.component.css"],
})
export class VillanosComponent implements OnInit {
  public heroe: Heroe = new Heroe();
  public heroes: Heroe[] = [];
  public panelOpenState = false;
  public contenedor: any = Object;
  public spliter = [];

  constructor(private villanoApi: VillanoService) {}

  ngOnInit() {
    this.getAllVillanos();
  }

  splitterFunction(slp: any) {
    console.log(slp);
    let receptor = [];
    receptor = slp.split(",");
    this.spliter = receptor;
    return this.spliter;
  }

  // getHeroByName() {
  //   let he: string = "ironman";
  //   let rd: Respuesta = new Respuesta();
  //   rd.results = [];
  //   let re = rd.results;

  //   this.villanoApi.getHeroesByName(he).subscribe((res) => {
  //     console.log("Por nombre", res);
  //     re = res.results;
  //     if (re.length > 1) {
  //       // console.log("if");
  //       re.forEach((ele) => {
  //         this.heroes.push(ele);
  //       });
  //     } else if ((re.length = 1)) {
  //       // console.log("else if");
  //       this.heroe.id = re[0].id;
  //       this.heroe.images = re[0].images["url"];
  //       this.heroe.name = re[0].name;
  //       this.heroe.appearance = re[0].appearance;
  //       this.heroe.appearance.eyecolor = re[0].appearance["eye-color"];
  //       this.heroe.appearance.gender = re[0].appearance["gender"];
  //       this.heroe.appearance.haircolor = re[0].appearance["hair-color"];
  //       this.heroe.appearance.height = re[0].appearance["height"];
  //       this.heroe.appearance.race = re[0].appearance["race"];
  //       this.heroe.appearance.weight = re[0].appearance["weight"];
  //       this.heroe.biography = re[0].biography;
  //       this.heroe.biography.fullname = re[0].biography["full-name"];
  //       this.heroe.biography.aliases = re[0].biography["aliases"];
  //       this.heroe.biography.alignment = re[0].biography["alignment"];

  //       this.heroe.biography.alteregos = re[0].biography["alter-egos"];
  //       this.heroe.biography.firstappearance =
  //         re[0].biography["first-appearance"];
  //       this.heroe.biography.placeofbirth = re[0].biography["place-of-birth"];
  //       this.heroe.biography.publisher = re[0].biography["publisher"];
  //       this.heroe.connections = re[0].connections;

  //       this.heroe.connections.groupaffiliation = this.splitterFunction(
  //         re[0].connections["group-affiliation"]
  //       );
  //       this.heroe.connections.relatives = re[0].connections["relatives"];

  //       this.heroe.powerstats = re[0].powerstats;
  //       this.heroe.powerstats.combat = re[0].powerstats.combat;
  //       this.heroe.powerstats.durability = re[0].powerstats.durability;
  //       this.heroe.powerstats.intelligence = re[0].powerstats.intelligence;
  //       this.heroe.powerstats.power = re[0].powerstats.power;
  //       this.heroe.powerstats.speed = re[0].powerstats.speed;
  //       this.heroe.powerstats.strength = re[0].powerstats.strength;
  //       this.heroe.work = re[0].work;
  //       this.heroe.work.base = re[0].work.base;
  //       this.heroe.work.occupation = re[0].work.occupation;

  //       this.contenedor = re[0].biography["aliases"];
  //       // console.log("Le contenedor", this.contenedor);
  //     }
  //     // console.log(re[0]);
  //     // console.log("bio", re[0].biography["full-name"]);
  //   });
  // }

  // getHeroById() {
  //   // let idHeroe: string = "1";
  //   let objHeroe: Heroe;
  //   this.heroes = [];
  //   // for (let x = 1; x < 732; x++) {
  //   for (let x = 1; x < 732; x++) {
  //     this.villanoApi.getHeroesById(x.toString()).subscribe((res) => {
  //       // console.log("por id", res);
  //       objHeroe = res;

  //       if (objHeroe.biography["alignment"] == "bad") {
  //         this.heroe = new Heroe();
  //         // console.log(objHeroe.name);
  //         this.heroe.id = objHeroe.id;
  //         this.heroe.image = objHeroe.image["url"];
  //         this.heroe.name = objHeroe.name;
  //         this.heroe.appearance = objHeroe.appearance;
  //         this.heroe.appearance.eyecolor = objHeroe.appearance["eye-color"];
  //         this.heroe.appearance.gender = objHeroe.appearance["gender"];
  //         this.heroe.appearance.haircolor = objHeroe.appearance["hair-color"];
  //         this.heroe.appearance.height = objHeroe.appearance["height"];
  //         this.heroe.appearance.race = objHeroe.appearance["race"];
  //         this.heroe.appearance.weight = objHeroe.appearance["weight"];
  //         this.heroe.biography = objHeroe.biography;
  //         this.heroe.biography.fullname = objHeroe.biography["full-name"];
  //         this.heroe.biography.aliases = objHeroe.biography["aliases"];
  //         this.heroe.biography.alignment = objHeroe.biography["alignment"];

  //         this.heroe.biography.alteregos = objHeroe.biography["alter-egos"];
  //         this.heroe.biography.firstappearance =
  //           objHeroe.biography["first-appearance"];
  //         this.heroe.biography.placeofbirth =
  //           objHeroe.biography["place-of-birth"];
  //         this.heroe.biography.publisher = objHeroe.biography["publisher"];
  //         this.heroe.connections = objHeroe.connections;
  //         this.heroe.connections.groupaffiliation = this.splitterFunction(
  //           objHeroe.connections["group-affiliation"]
  //         );
  //         this.heroe.connections.relatives = objHeroe.connections["relatives"];
  //         this.heroe.powerstats = objHeroe.powerstats;
  //         this.heroe.powerstats.combat = objHeroe.powerstats.combat;
  //         this.heroe.powerstats.durability = objHeroe.powerstats.durability;
  //         this.heroe.powerstats.intelligence = objHeroe.powerstats.intelligence;
  //         this.heroe.powerstats.power = objHeroe.powerstats.power;
  //         this.heroe.powerstats.speed = objHeroe.powerstats.speed;
  //         this.heroe.powerstats.strength = objHeroe.powerstats.strength;
  //         this.heroe.work = objHeroe.work;
  //         this.heroe.work.base = objHeroe.work.base;
  //         this.heroe.work.occupation = objHeroe.work.occupation;
  //         this.contenedor = objHeroe.biography["aliases"];
  //         // console.log(this.heroe);
  //         this.heroes.push(this.heroe);
  //       }
  //     });
  //   }
  // }

  getAllVillanos() {
    let objHeroe: Heroe;
    this.heroes = [];
    this.villanoApi.getAll().subscribe((res) => {
      for (let i = 0; i < res.length; i++) {
        objHeroe = res[i];
        console.log(res[i]);
        console.log(objHeroe);
        if (objHeroe.biography["alignment"] == "bad") {
          this.heroe = new Heroe();
          // console.log(objHeroe.name);
          this.heroe.id = objHeroe.id;
          this.heroe.images =
            objHeroe.images === undefined
              ? objHeroe.image["url"]
              : objHeroe.images["md"];
          this.heroe.name = objHeroe.name;
          this.heroe.appearance = objHeroe.appearance;
          this.heroe.appearance.eyecolor = objHeroe.appearance["eye-color"];
          this.heroe.appearance.gender = objHeroe.appearance["gender"];
          this.heroe.appearance.haircolor = objHeroe.appearance["hair-color"];
          this.heroe.appearance.height = objHeroe.appearance["height"];
          this.heroe.appearance.race = objHeroe.appearance["race"];
          this.heroe.appearance.weight = objHeroe.appearance["weight"];
          this.heroe.biography = objHeroe.biography;
          this.heroe.biography.fullname = objHeroe.biography["full-name"];
          this.heroe.biography.aliases = objHeroe.biography["aliases"];
          this.heroe.biography.alignment = objHeroe.biography["alignment"];

          this.heroe.biography.alteregos = objHeroe.biography["alter-egos"];
          this.heroe.biography.firstappearance =
            objHeroe.biography["first-appearance"];
          this.heroe.biography.placeofbirth =
            objHeroe.biography["place-of-birth"];
          this.heroe.biography.publisher = objHeroe.biography["publisher"];
          this.heroe.connections = objHeroe.connections;
          this.heroe.connections.groupAffiliation =
            objHeroe.connections["groupAffiliation"] === undefined
              ? this.splitterFunction(objHeroe.connections["group-affiliation"])
              : this.splitterFunction(objHeroe.connections["groupAffiliation"]);
          this.heroe.connections.relatives = objHeroe.connections["relatives"];
          this.heroe.powerstats = objHeroe.powerstats;
          this.heroe.powerstats.combat = objHeroe.powerstats.combat;
          this.heroe.powerstats.durability = objHeroe.powerstats.durability;
          this.heroe.powerstats.intelligence = objHeroe.powerstats.intelligence;
          this.heroe.powerstats.power = objHeroe.powerstats.power;
          this.heroe.powerstats.speed = objHeroe.powerstats.speed;
          this.heroe.powerstats.strength = objHeroe.powerstats.strength;
          this.heroe.work = objHeroe.work;
          this.heroe.work.base = objHeroe.work.base;
          this.heroe.work.occupation = objHeroe.work.occupation;
          this.contenedor = objHeroe.biography["aliases"];
          this.heroes.push(this.heroe);
        }
      }
    });
  }
}
