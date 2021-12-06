import News, { INews } from './news/news';
import Sources, { ISources } from './sources/sources';

export interface DataNews {
  status: string;
  totalResults: number;
  articles: INews[];
}
export interface DataSources {
  status: string;
  sources: ISources[];
}

export class AppView {
  private news: News;

  private sources: Sources;

  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  drawNews(data: DataNews) {
    const values = data?.articles ? data?.articles : [];
    this.news.draw(values);
  }

  drawSources(data: DataSources) {
    const values = data?.sources ? data?.sources : [];
    this.sources.draw(values);
  }
}

export default AppView;
