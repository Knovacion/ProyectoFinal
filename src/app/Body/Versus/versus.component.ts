import { Component, OnInit } from '@angular/core';
import { Heroe } from 'src/app/Models/heroe';
import { HeroesService } from '../Services/heroes.service';

@Component({
  selector: 'app-versus',
  templateUrl: './versus.component.html',
  styleUrls: ['./versus.component.css']
})
export class VersusComponent implements OnInit {
  
  public allHeroes:Heroe[] = []; 
  public allVillans:Heroe[] = []; 

  constructor(public heroApi:HeroesService) { }

  ngOnInit() {
    this.getAllCharacters();
  }
  getAllCharacters()
  {
    this.allHeroes = [];
    this.allVillans = [];

    this.heroApi.getAll().subscribe( res=>{
      res.forEach(ele => {
        if(ele.biography.alignment.toLowerCase() =="good")
        {
          this.allHeroes.push(ele)
      }
      else{
          this.allVillans.push(ele)
      }
        
      });
    })
    console.log("Heroes",this.allHeroes);
    console.log("Villanos",this.allVillans);    
  }

  
}
