import { Component, EventEmitter, input, Input, model, output, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  imports:[FormsModule],
}) 

export class SearchBarComponent {

  search = model<string>('Initial');
   

   searchButtonClicked = output();

  searchClick() {
    this.searchButtonClicked.emit();
  }

}
