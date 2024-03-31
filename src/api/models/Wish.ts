import { subDays } from 'date-fns';

export interface IWish {
  id: string;
  title: string;
  url: string;
  price: number;
  date: string;
}

export interface IWishCreate {
  title: string;
  url: string;
  price: number;
}

export interface IWishPrice {
  price: number;
}

export const MockedWishes: IWish[] = [
  {
    id: '1',
    title: 'First comfy wish',
    url: 'https://comfy.ua/ua/smartfon-apple-iphone-15-pro-128gb-natural-titanium.html',
    price: 46999,
    date: subDays(new Date(), 2).toISOString(),
  },
  {
    id: '2',
    title: 'Second comfy wish',
    url: 'https://comfy.ua/ua/smartfon-xiaomi-redmi-note-13-pro-8-256gb-midnight-black.html',
    price: 10999,
    date: new Date().toISOString(),
  },
];
