import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollStateService {
  trendingScrollPosition = signal(0);

  setTrendingScrollPosition(position: number) {
    this.trendingScrollPosition.set(position);
  }

  getTrendingScrollPosition() {
    return this.trendingScrollPosition();
  }
}
