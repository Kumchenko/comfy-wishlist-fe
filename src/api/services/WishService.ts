import { apiClient } from '../ApiClient';
import { IWish, IWishCreate, IWishParseResult } from '../models/Wish';

export class WishService {
  getAll = async () => {
    return (await apiClient.get(`/wishlist`)).data as IWish[];
  };

  exportExcel = async () => {
    return (
      await apiClient.get(`/wishlist/export`, {
        responseType: 'arraybuffer',
      })
    ).data;
  };

  parseByUrl = async (url: string) => {
    return (await apiClient.get(`/parse?url=${encodeURIComponent(url)}`))
      .data as IWishParseResult;
  };

  parseByHtml = async (htmlContent: File) => {
    return (
      await apiClient.post(`/parse`, htmlContent, {
        headers: {
          'Content-Type': 'text/html',
        },
      })
    ).data as IWishParseResult;
  };

  createOne = async (newWish: IWishCreate) => {
    return (await apiClient.post(`/wishlist`, newWish)).data as IWish;
  };

  deleteById = async (id: string) => {
    return (await apiClient.delete(`/wishlist/${id}`)).status;
  };
}
