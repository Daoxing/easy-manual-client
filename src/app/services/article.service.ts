import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CREATE_ARTICLE } from '../graphql';
@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private apollo: Apollo) {}

  createArticle(articleInfo: any) {
    this.apollo
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
}
