import { Component, computed, input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { LocalGifInterface } from '@app/interfaces/local-gif.interface';

@Component({
  selector: 'app-gif-item',
  imports: [MatIconModule],
  templateUrl: './gif-item.html',
  styleUrl: './gif-item.scss',
})
export class GifItem {
  gif = input<LocalGifInterface>();
  isCopied = signal(false);
  copyText = computed(() => (this.isCopied() ? '¡Copiado!' : 'Copiar link'));

  copyToClipboard(url: string) {
    navigator.clipboard.writeText(url);
    this.isCopied.set(true);
    setTimeout(() => this.isCopied.set(false), 2000);
  }
}
