import { Component, computed, input, Input, SimpleChanges } from '@angular/core';
import { Monster } from '../../models/monster.model';
import { MonsterTypeProperties } from '../../utils/monster.utils';

@Component({
  selector: 'app-playing-card',
  templateUrl: './playing-card.component.html',
  styleUrls: ['./playing-card.component.css']
})
export class PlayingCardComponent  {

monster = input(new Monster());
 monsterTypeIcon = computed(() => {
  return MonsterTypeProperties[this.monster().type].imageUrl;
 });
 backgroundColor = computed (() => {
  return MonsterTypeProperties[this.monster().type].color;
 })

 
 }
  
