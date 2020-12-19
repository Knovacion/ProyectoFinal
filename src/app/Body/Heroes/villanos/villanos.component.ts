import { Component, OnInit } from "@angular/core";
import { Heroe } from "src/app/Models/heroe";
import { Respuesta } from "src/app/Models/respuesta";
import { VillanoService } from "../../Services/villano.service";
import { FormGroup, FormControl } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

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
  // private finishPage = 20;
  // private actualPage: number;

  constructor(
    private villanoApi: VillanoService,
    private toastr: ToastrService
  ) {
    // this.actualPage = 1;
  }

  public SearchForm = new FormGroup({
    txtSearch: new FormControl(""),
  });

  ngOnInit() {
    this.getAllVillanos();
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

  getHeroByName(villano: string) {
    if (villano == "" || villano == undefined) {
      this.toastr.warning("Ingrese al menos 3 caracteres", "Alerta");
    } else {
      if (villano.length < 4) {
        this.toastr.warning("Ingrese al menos 3 caracteres", "Alerta");
      } else {
        let lstRespHeroeAux: Respuesta = new Respuesta();
        lstRespHeroeAux.results = [];
        let lstRespHeroe = lstRespHeroeAux.results;
        this.villanoApi.getHeroesByName(villano).subscribe((res) => {
          this.heroes = [];
          lstRespHeroe = res.results;
          if (lstRespHeroe.length > 1) {
            // console.log("if");
            this.recorridoHeroes(lstRespHeroe);
          } else if (lstRespHeroe.length == 1) {
            // console.log("else if");
            this.recorridoHeroes(lstRespHeroe);
            // console.log("Le contenedor", this.contenedor);
          }

          if (this.heroes.length == 0) {
            this.toastr.warning(
              "No se han encontrado resultados para su búsqueda",
              "Alerta"
            );
          }

          // console.log(re[0]);
          // console.log("bio", re[0].biography["full-name"]);
        });
      }
    }
  }

  searchByName() {
    this.getHeroByName(this.SearchForm.value.txtSearch);
  }

  getAllVillanos() {
    this.villanoApi.getAll().subscribe((res) => {
      this.recorridoHeroes(res);
    });
  }

  recorridoHeroes(villanoArray: Heroe[]) {
    let objHeroe: Heroe;
    this.heroes = [];
    for (let i = 0; i < villanoArray.length; i++) {
      objHeroe = villanoArray[i];
      // console.log(res[i]);
      // console.log(objHeroe);
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
  }

  // onScroll() {
  //   if (this.actualPage < this.finishPage) {
  //     this.getAllVillanos();
  //     this.actualPage++;
  //   } else {
  //     console.log("No more lines. Finish page!");
  //   }
  // }
}
