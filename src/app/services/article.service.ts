import { query } from '@angular/animations';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import {
  CREATE_ARTICLE,
  DELETE_ARTICLE,
  GET_ACCESSIBLE_ARTICLES,
  GET_ARTICLES_IN_GROUP,
  GET_MY_ALL_ARTICLES,
  GET_USER_ALL_PUBLIC_ARTICLES,
  QUERY_ARTICLE,
  UPDATE_ARTICLE,
} from '../graphql';
@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private apollo: Apollo) {}

  createArticle(articleInfo: any) {
    return this.apollo
      .mutate<any>({
        mutation: CREATE_ARTICLE,
        variables: {
          articleInfo,
        },
      })
      .pipe(map(({ data }) => data.createArticle));
  }

  getArticle(id: string) {
    return this.apollo
      .query<any>({
        query: QUERY_ARTICLE,
        variables: {
          articleId: id,
        },
      })
      .pipe(
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

  deleteArticle(articleId: string) {
    return this.apollo
      .mutate<any>({
        mutation: DELETE_ARTICLE,
        variables: {
          articleId,
        },
      })
      .pipe(map(({ data }) => data.deleteArticle));
  }

  getAccessibleArticles(page, sort) {
    return this.apollo
      .query<any>({
        query: GET_ACCESSIBLE_ARTICLES,
        variables: {
          page,
          sort,
        },
      })
      .pipe(
        map(({ data }) => {
          return data.getUsersAccessibleArticles;
        }),
      );
  }

  getMyAllArticles(page, sort) {
    return this.apollo
      .query<any>({
        query: GET_MY_ALL_ARTICLES,
        variables: {
          page,
          sort,
        },
      })
      .pipe(
        map(({ data }) => {
          return data.getUsersAllArticles;
        }),
      );
  }

  getUserAllPublicArticles(page, sort) {
    return this.apollo
      .query<any>({
        query: GET_USER_ALL_PUBLIC_ARTICLES,
        variables: {
          page,
          sort,
        },
      })
      .pipe(
        map(({ data }) => {
          return data.getUsersAllPublicArticles;
        }),
      );
  }

  getAllArticlesInGroup(group_id, page, sort) {
    return this.apollo
      .query<any>({
        query: GET_ARTICLES_IN_GROUP,
        variables: {
          group_id,
          page,
          sort,
        },
      })
      .pipe(
        map(({ data }) => {
          return data.getArticlesInGroup;
        }),
      );
  }
}
