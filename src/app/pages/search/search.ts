import { Component, computed, effect, inject, signal } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { GifList } from '@app/shared/gif-list/gif-list';
import { GiphyService } from '@app/services/giphy-service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgClass } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [MatIconModule, GifList, MatButtonModule, MatTooltipModule, NgClass, MatChipsModule],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export default class Search {
  private searchSubject = new Subject<string>();

  giphyService = inject(GiphyService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  searchTerm = signal('');

  isSavedSearch = computed(() =>
    Object.keys(this.giphyService.searchHistory()).includes(this.searchTerm())
  );
  tooltipMessage = computed(() =>
    this.isSavedSearch() ? 'Eliminar búsqueda de favoritos' : 'Marca esta búsqueda como favorita'
  );
  searchKeys = computed(() =>
    this.giphyService.searchHistoryKeys().filter((key) => key !== this.searchTerm())
  );

  constructor() {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['q']) {
        this.searchTerm.set(params['q']);
        this.giphyService.search(params['q']);
      } else {
        this.searchTerm.set('');
        this.giphyService.search('');
      }
    });

    effect(() => {
      this.searchSubject.pipe(debounceTime(500), distinctUntilChanged()).subscribe((term) => {
        if (!term) {
          this.router.navigate([], { replaceUrl: true });
        } else {
          this.router.navigate([], {
            queryParams: { q: term },
            queryParamsHandling: 'merge',
            replaceUrl: true,
          });
        }
      });
    });
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchSubject.next(value);
  }

  addFavoriteSearch() {
    if (!this.searchTerm()) return;

    const searchExists = Object.keys(this.giphyService.searchHistory()).includes(this.searchTerm());
    if (searchExists) {
      this.giphyService.searchHistory.update((history) => {
        const { [this.searchTerm()]: _, ...rest } = history;
        return rest;
      });
    } else {
      this.giphyService.searchHistory.update((history) => {
        return { ...history, [this.searchTerm()]: this.giphyService.searchGifs() };
      });
    }
  }

  handleHistorySearch(key: string) {
    this.router.navigate([], {
      queryParams: { q: key },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }
}
