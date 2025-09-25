import { Component, input } from '@angular/core';
import { LocalGifInterface } from '@app/interfaces/local-gif.interface';

@Component({
  selector: 'app-gif-item',
  imports: [],
  templateUrl: './gif-item.html',
  styleUrl: './gif-item.scss',
})
export class GifItem {
  gif = input<LocalGifInterface>();
}
