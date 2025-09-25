import { Component, inject, effect } from '@angular/core';
import { GiphyService } from '@app/services/giphy-service';

@Component({
  selector: 'app-trending',
  imports: [],
  templateUrl: './trending.html',
  styleUrl: './trending.scss'
})
export default class Trending {

  giphyService = inject(GiphyService);

  constructor() {
    this.giphyService.getTrending();
  }

}
