import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { GifItem } from '../gif-item/gif-item';
import { LocalGifInterface } from '@app/interfaces/local-gif.interface';
import { GiphyService } from '@app/services/giphy-service';
import { ScrollStateService } from '@app/services/scroll-state-service';

@Component({
  selector: 'app-gif-list',
  imports: [GifItem],
  templateUrl: './gif-list.html',
  styleUrl: './gif-list.scss',
})
export class GifList implements AfterViewInit {
  gifsService = inject(GiphyService);
  scrollStateService = inject(ScrollStateService);
  gifs = input<LocalGifInterface[]>([]);
  refName = input<string>('');
  gifListRef = viewChild<ElementRef>('gifListRef');
  limit = signal(50); // Límite de gifs a cargar al hacer scroll, valor por defecto 25
  columnsCount = input(4); // Número de columnas dinámico, valor por defecto 4

  orderedGifs = computed(() => {
    const columns: LocalGifInterface[][] = Array.from({ length: this.columnsCount() }, () => []);
    this.gifs().forEach((gif, i) => {
      columns[i % this.columnsCount()].push(gif);
    });
    return columns;
  });

  ngAfterViewInit(): void {
    const scrollDiv = this.gifListRef()?.nativeElement;
    if (!scrollDiv) return;

    scrollDiv.scrollTop = this.scrollStateService.getTrendingScrollPosition();
  }

  onScroll() {
    const scrollDiv = this.gifListRef()?.nativeElement;
    if (!scrollDiv) return;

    const scrollTop = scrollDiv.scrollTop;
    const scrollHeight = scrollDiv.scrollHeight;
    const clientHeight = scrollDiv.clientHeight;
    const atBottom = scrollTop + clientHeight >= scrollHeight - 300; // Umbral de 300px
    this.scrollStateService.setTrendingScrollPosition(scrollTop);
    if (atBottom) {
      this.gifsService.getTrending();
    }
  }
}
