import { Component, OnInit } from "@angular/core";
import { HeroesService } from "../../Services/heroes.service";

@Component({
  selector: "app-heroes",
  templateUrl: "./heroes.component.html",
  styleUrls: ["./heroes.component.css"],
})
export class HeroesComponent implements OnInit {
  constructor(public heroApi: HeroesService) {}

  ngOnInit() {
    this.getHeroByName();
  }
  getHeroByName() {
    let he:string = "batman";
    this.heroApi.getHeroesByName(he).subscribe((res) => {
      console.log(res);
    });
  }
}
