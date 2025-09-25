import { Component, input } from '@angular/core';
import { GifItem } from '../gif-item/gif-item';
import { LocalGifInterface } from '@app/interfaces/local-gif.interface';

@Component({
  selector: 'app-gif-list',
  imports: [GifItem],
  templateUrl: './gif-list.html',
  styleUrl: './gif-list.scss',
})
export class GifList {
  gifs = input<LocalGifInterface[]>([]);
}
