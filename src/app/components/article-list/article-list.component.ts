import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArticleService } from 'src/app/services';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css'],
})
export class ArticleListComponent implements OnInit {
  articles: any[] = [];
  @Input() enableAction: boolean = false;
  @Input() listType: string = '';
  @Output() afterQueryArticles: EventEmitter<any> = new EventEmitter();
  totalCount: number = 0;
  endOfArticles: boolean = false;
  defaultSort: any = {
    field: 'created_tms',
    order: 'DESC',
  };

  defaultPage: any = {
    pageNo: 1,
    pageCount: 10,
  };

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.initQueryArticles();
  }

  sort(field: string) {
    if (this.defaultSort.field === field) {
      this.defaultSort.order =
        this.defaultSort.order === 'ASC' ? 'DESC' : 'ASC';
    } else {
      this.defaultSort.order = 'ASC';
    }
    this.defaultSort.field = field;
    this.initQueryArticles();
  }

  moreArticles() {
    this.defaultPage.pageNo = this.defaultPage.pageNo + 1;
    this.getMoreArticles();
  }
  private checkEndOfArticles(articles: any[]) {
    return (
      this.totalCount <=
      articles.length +
        (this.defaultPage.pageNo - 1) * this.defaultPage.pageCount
    );
  }
  private initQueryArticles() {
    switch (this.listType) {
      case 'accessibleArticles':
        {
          this.articleService
            .getAccessibleArticles(this.defaultPage, this.defaultSort)
            .subscribe((data) => {
              this.articles = data.articles;
              this.totalCount = data.totalCount;
              this.endOfArticles = this.checkEndOfArticles(data.articles);
              this.afterQueryArticlesEmit();
            });
        }
        break;
      case 'myAllArticles':
        {
          this.articleService
            .getMyAllArticles(this.defaultPage, this.defaultSort)
            .subscribe((data) => {
              this.articles = data.articles;
              this.totalCount = data.totalCount;
              this.endOfArticles = this.checkEndOfArticles(data.articles);
              this.afterQueryArticlesEmit();
            });
        }
        break;
      case 'userAllPublicArticles':
        {
          this.articleService
            .getUserAllPublicArticles(this.defaultPage, this.defaultSort)
            .subscribe((data) => {
              this.articles = data.articles;
              this.totalCount = data.totalCount;
              this.endOfArticles = this.checkEndOfArticles(data.articles);
              this.afterQueryArticlesEmit();
            });
        }
        break;
      default:
        break;
    }
  }

  private getMoreArticles() {
    switch (this.listType) {
      case 'accessibleArticles':
        {
          this.articleService
            .getAccessibleArticles(this.defaultPage, this.defaultSort)
            .subscribe((data) => {
              this.articles = this.articles.concat(data.articles);
              this.totalCount = data.totalCount;
              this.endOfArticles = this.checkEndOfArticles(data.articles);
              this.afterQueryArticlesEmit();
            });
        }
        break;
      case 'myAllArticles':
        {
          this.articleService
            .getMyAllArticles(this.defaultPage, this.defaultSort)
            .subscribe((data) => {
              this.articles = this.articles.concat(data.articles);
              this.totalCount = data.totalCount;
              this.endOfArticles = this.checkEndOfArticles(data.articles);
              this.afterQueryArticlesEmit();
            });
        }
        break;
      case 'userAllPublicArticles':
        {
          this.articleService
            .getUserAllPublicArticles(this.defaultPage, this.defaultSort)
            .subscribe((data) => {
              this.articles = this.articles.concat(data.articles);
              this.totalCount = data.totalCount;
              this.endOfArticles = this.checkEndOfArticles(data.articles);
              this.afterQueryArticlesEmit();
            });
        }
        break;
      default:
        break;
    }
  }
  private afterQueryArticlesEmit() {
    this.afterQueryArticles.emit({
      listType: this.listType,
      totalCount: this.totalCount,
    });
  }
}
