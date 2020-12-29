import { Component, OnInit } from "@angular/core";
import { Heroe } from "src/app/Models/heroe";
import { Respuesta } from "src/app/Models/respuesta";
// import { Favorito } from "src/app/Models/favorito";
import { VillanoService } from "../../Services/villano.service";
import { FormGroup, FormControl } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { FirestoreService } from "../../Services/firestore.service";
import { Favoritos } from "../../../Interfaces/favoritos";
import { Router } from "@angular/router";
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
  public lstFavo: Favoritos[] = [];

  public lstHeroeDefinitiva: Heroe[] = [];

  private finishPage = 5;
  private actualPage: number;
  private contadorLinea: number = 0;
  constructor(
    private villanoApi: VillanoService,
    private toastr: ToastrService,
    private firestoreService: FirestoreService,
    private router: Router
  ) {
    this.actualPage = 1;
  }

  public SearchForm = new FormGroup({
    txtSearch: new FormControl(""),
  });

  ngOnInit() {
    this.getFavoritos();
  }

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
          console.log(res);
          if (res.response != "error") {
            this.heroes = [];
            lstRespHeroe = res.results;
            if (lstRespHeroe.length > 1) {
              this.recorridoHeroes(lstRespHeroe);
            } else if (lstRespHeroe.length == 1) {
              this.recorridoHeroes(lstRespHeroe);
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

  getAllVillanos() {
    this.villanoApi.getAll().subscribe((res) => {
      this.recorridoHeroes(res);
      this.cargaListaScroll();
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
        this.lstFavo.forEach((fav) => {
          if (fav.idHeroe == this.heroe.id) {
            this.heroe.favorito = true;
          }
        });
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

  async addFavorito(idVillano: number, favorito: boolean, index: number) {
    let uid: string = localStorage.getItem("uid");
    const objFavorito: Favoritos = {
      uid: uid,
      idHeroe: idVillano.toString(),
    };

    if (favorito) {
      this.firestoreService
        .getFavoritosDelete(uid, idVillano.toString())
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
      this.getAllVillanos();
      return this.lstFavo;
    });
  }
}
