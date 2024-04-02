export interface IWish {
  id: string;
  title: string;
  url: string;
  price: number;
  dateCreated: string;
}

export interface IWishCreate {
  title: string;
  url: string;
  price: number;
  dateCreated: string;
}

export interface IWishParseResult {
  name: string;
  price: number;
}
