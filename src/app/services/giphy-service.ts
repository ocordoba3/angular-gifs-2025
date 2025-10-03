import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { GiphyResponse } from '@app/interfaces/giphy.interfaces';
import { LocalGifInterface } from '@app/interfaces/local-gif.interface';
import { giphyArrayTransformer } from '@app/utils/functions';
import { environment } from '@env/environment';
import { map } from 'rxjs';

const GIFS_STORAGE_KEY = 'searchHistory';

function loadFromLocalStorage() {
  const stored = localStorage.getItem(GIFS_STORAGE_KEY) ?? '{}';
  return JSON.parse(stored);
}

@Injectable({
  providedIn: 'root',
})
export class GiphyService {
  private http = inject(HttpClient);
  private BASE_URL = environment.api_base_url;
  private API_KEY = environment.giphy_api_key;

  trendingGifs = signal<LocalGifInterface[]>([]);
  trendingGifsOffset = signal(0);
  trendingGifsIsLoading = signal(false);
  searchGifs = signal<LocalGifInterface[]>([]);
  searchHistory = signal<Record<string, LocalGifInterface[]>>(loadFromLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  saveDataToLocalStorage = effect(() => {
    localStorage.setItem(GIFS_STORAGE_KEY, JSON.stringify(this.searchHistory()));
  });

  getTrending(limit: number = 32, rating: string = 'G') {
    if (this.trendingGifsIsLoading()) return;

    this.trendingGifsIsLoading.set(true);

    this.http
      .get<GiphyResponse>(`${this.BASE_URL}/trending`, {
        params: {
          api_key: this.API_KEY,
          limit,
          rating,
          offset: this.trendingGifsOffset() * 32,
        },
      })
      .pipe(map((response) => giphyArrayTransformer(response.data)))
      .subscribe((data) => {
        this.trendingGifs.update((prev) => [...prev, ...data]);
        this.trendingGifsIsLoading.set(false);
        this.trendingGifsOffset.set(this.trendingGifsOffset() + 1);
      });
  }

  search(
    term: string,
    limit: number = 32,
    offset: number = 0,
    rating: string = 'G',
    lang: string = 'en'
  ) {
    const historyExists = this.searchHistory()[term];

    if (historyExists) {
      this.searchGifs.set(historyExists);
      return;
    }

    this.http
      .get<GiphyResponse>(`${this.BASE_URL}/search`, {
        params: {
          api_key: this.API_KEY,
          q: term,
          limit,
          offset,
          rating,
          lang,
        },
      })
      .pipe(map((response) => giphyArrayTransformer(response.data)))
      .subscribe((data) => this.searchGifs.set(data));
  }
}
