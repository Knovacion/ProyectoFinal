import { FormGroup, FormControl } from "@angular/forms";
import { Component, HostListener, OnInit } from "@angular/core";
import { Respuesta } from "src/app/Models/respuesta";
import { HeroesService } from "../../Services/heroes.service";

//modelos
import { Favoritos } from "src/app/Interfaces/favoritos";
import { Heroe } from "src/app/Models/heroe";

//servicios
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { FirestoreService } from "../../Services/firestore.service";

@Component({
  selector: "app-heroes",
  templateUrl: "./heroes.component.html",
  styleUrls: ["./heroes.component.css"],
})
export class HeroesComponent implements OnInit {
  public heroe: Heroe = new Heroe();
  public heroes: Heroe[] = [];
  public panelOpenState = false;
  public contenedor: any = "";
  public spliter = [];
  public lstFavo: Favoritos[] = [];
  public lstHeroeDefinitiva: Heroe[] = [];
  public SearchForm = new FormGroup({
    txtSearch: new FormControl(""),
  });

  public showGoUpButton: boolean;
  private finishPage = 5;
  private actualPage: number;
  private contadorLinea: number = 0;
  private showScrollHeight = 400;
  private hideScrollHeight = 200;

  constructor(
    public heroApi: HeroesService,
    private toastr: ToastrService,
    private firestoreService: FirestoreService,
    private router: Router
  ) {
    this.actualPage = 1;
    this.showGoUpButton = false;
  }

  ngOnInit() {
    this.getFavoritos();
  }
  //Metodos
  onScroll() {
    if (this.actualPage < this.finishPage) {
      this.cargaListaScroll();
      this.actualPage++;
    } else {
      console.log("No more lines. Finish page!");
    }
  }

  onKey(event: any) {
    this.searchByName();
  }

  cargaListaScroll() {
    for (let i = 0; i < 40; i++) {
      if (this.contadorLinea < this.heroes.length) {
        this.lstHeroeDefinitiva.push(this.heroes[this.contadorLinea]);
      }
      this.contadorLinea++;
    }
  }

  splitterFunction(slp: any) {
    let receptor = [];
    receptor = slp.split(",");
    this.spliter = receptor;
    return this.spliter;
  }
  getHeroByName(hero: string) {
    if (hero == "" || hero == undefined) {
      this.toastr.warning("Ingrese al menos 3 caracteres", "Alerta");
    } else {
      if (hero.length < 4) {
        this.toastr.warning("Ingrese al menos 3 caracteres", "Alerta");
      } else {
        let lstRespHeroeAux: Respuesta = new Respuesta();
        lstRespHeroeAux.results = [];
        let lstRespHeroe = lstRespHeroeAux.results;
        this.heroApi.getHeroesByName(hero).subscribe((res) => {
          console.log(res);
          if (res.response != "error") {
            this.heroes = [];
            lstRespHeroe = res.results;
            if (lstRespHeroe.length > 1) {
              this.processHeroArray(lstRespHeroe);
            } else if (lstRespHeroe.length == 1) {
              this.processHeroArray(lstRespHeroe);
            }
            if (this.heroes.length == 0) {
              this.toastr.warning(
                "No se han encontrado resultados para su búsqueda",
                "Alerta"
              );
            }
            this.lstHeroeDefinitiva = this.heroes;
          } else {
            this.toastr.warning(
              "No se han encontrado resultados para su búsqueda",
              "Alerta"
            );
          }
        });
      }
    }
  }

  searchByName() {
    this.getHeroByName(this.SearchForm.value.txtSearch);
  }

  getAllHeroes() {
    this.heroApi.getAll().subscribe((res) => {
      this.processHeroArray(res);
      this.cargaListaScroll();
    });
  }

  processHeroArray(heroArr: Heroe[]) {
    let objHeroe: Heroe;
    this.heroes = [];
    for (let i = 0; i < heroArr.length; i++) {
      objHeroe = heroArr[i];
      if (objHeroe.biography["alignment"] == "good") {
        this.heroe = new Heroe();
        // console.log(objHeroe.name);
        this.heroe.id = objHeroe.id;
        this.lstFavo.forEach((fav) => {
          if (fav.idHeroe == this.heroe.id) {
            this.heroe.favorito = true;
          }
        });
        this.contenedor = "";
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
          this.heroe.connections["groupAffiliation"] === undefined
            ? this.splitterFunction(this.heroe.connections["group-affiliation"])
            : this.splitterFunction(this.heroe.connections["groupAffiliation"]);
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
    return this.heroes;
  }
  async addFavorito(idHero: number, favorito: boolean, index: number) {
    this.panelOpenState = false;
    let uid: string = localStorage.getItem("uid");
    const objFavorito: Favoritos = {
      uid: uid,
      idHeroe: idHero.toString(),
    };

    if (favorito) {
      this.firestoreService
        .getFavoritosDelete(uid, idHero.toString())
        .then((resp) => {
          if (resp != "") {
            this.firestoreService.deleteFavoritos(resp).then((resp) => {
              if (resp) {
                this.toastr.success(
                  "Eliminado de favoritos correctamente",
                  "Proceso Correcto"
                );
                this.lstHeroeDefinitiva[index].favorito = false;
              } else {
                this.toastr.error(
                  "No se puede eliminar de favoritos",
                  "Alerta"
                );
              }
            });
          } else {
            this.toastr.error("No se puede eliminar de favoritos", "Alerta");
          }
        });
    } else {
      this.firestoreService.registerFavoritos(objFavorito).then((resp) => {
        if (resp.uid == uid) {
          this.toastr.success("Agregado a favoritos", "Proceso Correcto");
          this.lstHeroeDefinitiva[index].favorito = true;
        } else {
          this.toastr.error("No se pudo agregar a favorito", "Alerta");
        }
      });
    }
  }

  async getFavoritos() {
    let uid: string = localStorage.getItem("uid");
    await this.firestoreService.getFavoritos(uid.toString()).then((resp) => {
      this.lstFavo = resp;
      this.getAllHeroes();
      return this.lstFavo;
    });
  }

  scrollTop() {
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0; // Other
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (
      (window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop) > this.showScrollHeight
    ) {
      this.showGoUpButton = true;
    } else if (
      this.showGoUpButton &&
      (window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop) < this.hideScrollHeight
    ) {
      this.showGoUpButton = false;
    }
  }
}
