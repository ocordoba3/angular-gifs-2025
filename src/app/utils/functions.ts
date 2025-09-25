import { GifItemInterface } from '@app/interfaces/giphy.interfaces';
import { LocalGifInterface } from '@app/interfaces/local-gif.interface';

export function giphyArrayTransformer(data: GifItemInterface[]): LocalGifInterface[] {
  return data.map((item) => ({
    id: item.id,
    title: item.title,
    url: item.images.original.url,
  }));
}
