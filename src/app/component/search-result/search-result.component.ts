import { Component } from '@angular/core';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent {

  public openTab: string = "All";

  public tabbed(val: string) {
    this.openTab = val
  }

}
