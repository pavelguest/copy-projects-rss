export type Options = {
  [key: string]: string;
};
export type Callback<T> = (data: T) => void;
export interface INews {
  author: string;
  publishedAt: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  source: {
    name: string;
    id: string;
  };
}
export interface ISources {
  id: string;
  name: string;
  category: string;
  country: string;
  language: string;
  url: string;
  description: string;
}
export interface DataNews {
  status: string;
  totalResults: number;
  articles: INews[];
}
export interface DataSources {
  status: string;
  sources: ISources[];
}
