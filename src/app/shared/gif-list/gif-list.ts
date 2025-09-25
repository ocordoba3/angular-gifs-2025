import { Component, computed, input } from '@angular/core';
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

  columnsCount = input(4); // Número de columnas dinámico, valor por defecto 4

  orderedGifs = computed(() => {
    const columns: LocalGifInterface[][] = Array.from({ length: this.columnsCount() }, () => []);
    this.gifs().forEach((gif, i) => {
      columns[i % this.columnsCount()].push(gif);
    });
    return columns;
  });
}
