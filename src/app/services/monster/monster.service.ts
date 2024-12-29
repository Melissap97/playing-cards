import { HttpClient } from '@angular/common/http';
import { Monster } from './../../models/monster.model';
import { inject, Injectable } from '@angular/core';
import { IMonster } from '../../interfaces/monster.interface';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MonsterService {

  private http = inject(HttpClient);
  private BASE_URL = "http://localhost:54501/monsters/"

  getAll(): Observable<Monster[]> {
    return this.http.get<IMonster[]>(this.BASE_URL).pipe(
      map(monsterDictArray => {
        return monsterDictArray.map<Monster>(
          monsterDict => Monster.fromJson(monsterDict)
        )
      })
    )
    
  }

  get(id: number): Observable<Monster> {
    return this.http.get<IMonster>(this.BASE_URL + id + '/').pipe(
      map(monsterDict =>Monster.fromJson(monsterDict))
    )
    
  }
  add(monster: Monster): Observable<Monster> {
    return this.http.post<IMonster>(this.BASE_URL, monster.toJson()).pipe(
      map(monsterDict =>Monster.fromJson(monsterDict))
    )
   
  }

  update(monster: Monster): Observable<Monster> {
   return this.http.put<IMonster>(this.BASE_URL + monster.id + '/', monster.toJson()).pipe(
    map(monsterDict =>Monster.fromJson(monsterDict))
   )
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.BASE_URL + id + '/')
 
    }

  /*monsters: Monster[] = [];
  currentIndex: number = -1;

  constructor() {
    this.load();
  } 

  private save() {
    localStorage.setItem('monster', JSON.stringify(this.monsters)); //stockage en localstorage
  }

  private load() { //chargement du localstorage
    const monsterData = localStorage.getItem('monster');
    if (monsterData) {
      this.monsters = JSON.parse(monsterData).map((monsterJSON: any) => Object.assign(new Monster(), monsterJSON));
      this.currentIndex = Math.max(...this.monsters.map(monster => monster.id));
    } else {
      this.init();
      this.save();

    }
  }

  private init() {
    this.monsters = [];


    const monster1 = new Monster();
    monster1.id = 1;
    monster1.name = "Pikachu";
    monster1.hp = 40;
    monster1.figureCaption = "N°002 Pikachu";
    this.monsters.push(monster1);

    const monster2 = new Monster();
    monster2.id = 2;
    monster2.name = "Carapuce";
    monster2.image = "/carapuce.png";
    monster2.type = MonsterType.WATER;
    monster2.hp = 60;
    monster2.figureCaption = "N°003 Carapuce";
    this.monsters.push(monster2);

    const monster3 = new Monster();
    monster3.id = 3;
    monster3.name = "Bulbizarre";
    monster3.image = "/Bulbizarre.png";
    monster3.type = MonsterType.PLANT;
    monster3.hp = 60;
    monster3.figureCaption = "N°004 Bulbizarre";
    this.monsters.push(monster3);

    const monster4 = new Monster();
    monster4.id = 4;
    monster4.name = "Salamèche";
    monster4.image = "/Salamèche.png";
    monster4.type = MonsterType.FIRE;
    monster4.hp = 60;
    monster4.figureCaption = "N°005 Salamèche";
    this.monsters.push(monster4);
  }
 } */

}
