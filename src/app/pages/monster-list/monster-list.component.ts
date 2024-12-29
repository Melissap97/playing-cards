import { Component, computed, inject, model, signal} from '@angular/core';
import { Monster } from '../../models/monster.model';
import { MonsterService } from '../../services/monster/monster.service';
import { CommonModule } from '@angular/common';
import { PlayingCardComponent } from '../../components/playing-card/playing-card.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-monster-list',
  templateUrl: './monster-list.component.html',
  styleUrls: ['./monster-list.component.css'],
  imports :[CommonModule, PlayingCardComponent, SearchBarComponent]
})
export class MonsterListComponent  {

   private monsterService = inject(MonsterService);
  private router = inject(Router);

  monsters = toSignal(this.monsterService.getAll());
  search = model('');

  filteredMonsters = computed(() => {
    return this.monsters()?.filter(monster => monster.name.includes(this.search())) ?? [];
  });
  
  addMonster() {
    const genericMonster = new Monster();
    this.monsterService.add(genericMonster);
    this.monsters = toSignal(this.monsterService.getAll());
  }

  openMonster(monster: Monster) {
    this.router.navigate(['monster',monster.id]);
  }
}
