import { apiClient } from '../ApiClient';
import { IWish, IWishCreate, IWishPrice } from '../models/Wish';

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

  parsePrice = async (url: string) => {
    return (await apiClient.post(`/parse?url=${encodeURIComponent(url)}`))
      .data as IWishPrice;
  };

  createOne = async (newWish: IWishCreate) => {
    return (await apiClient.post(`/wishlist`, newWish)).data as IWish;
  };

  deleteById = async (id: string) => {
    return (await apiClient.delete(`/wishlist/${id}`)).status;
  };
}
