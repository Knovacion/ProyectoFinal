import { Apariencia } from "./apariencia";
import { Biografia } from "./biografia";
import { Conexiones } from "./conexiones";
import { PowerStats } from "./power-stats";
import { Trabajo } from "./trabajo";

export class Heroe {
  "appearance": Apariencia;
  "biography": Biografia;
  "connections": Conexiones;
  "id": string;
  "image": string;
  "name": string;
  "powerstats": PowerStats;
  "work": Trabajo;
}
