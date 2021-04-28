import { query } from '@angular/animations';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { CREATE_ARTICLE, QUERY_ARTICLE, UPDATE_ARTICLE } from '../graphql';
@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private apollo: Apollo) {}

  createArticle(articleInfo: any) {
    return this.apollo
      .mutate({
        mutation: CREATE_ARTICLE,
        variables: {
          articleInfo,
        },
      })
      .subscribe(
        ({ data }) => {
          console.log('---->', data);
        },
        (error) => {},
      );
  }

  getArticle(id: string) {
    return this.apollo
      .watchQuery<any>({
        query: QUERY_ARTICLE,
        variables: {
          articleId: id,
        },
      })
      .valueChanges.pipe(
        map(({ data }) => {
          return data.getArticle;
        }),
      );
  }

  updateArticle(articleInfo: any) {
    return this.apollo
      .mutate<any>({
        mutation: UPDATE_ARTICLE,
        variables: {
          articleInfo,
        },
      })
      .pipe(map(({ data }) => data.updateArticle));
  }
}
