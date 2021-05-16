import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  FIND_USER_BY_ID,
  GET_USERS_IN_GROUP,
  ME,
  UPDATE_USER_INFO,
  VERIFY_CODE,
} from '../graphql';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apollo: Apollo) {}
  verifyCode(code: string) {
    return this.apollo
      .mutate<any>({
        mutation: VERIFY_CODE,
        variables: {
          code,
        },
      })
      .pipe(
        map(({ data }) => {
          return data.verifyCode;
        }),
      );
  }
  me() {
    return this.apollo
      .query<any>({
        query: ME,
      })
      .pipe(
        map(({ data }) => {
          return data.me;
        }),
      );
  }
  updateUser(userInfo: any) {
    return this.apollo
      .mutate<any>({
        mutation: UPDATE_USER_INFO,
        variables: {
          userInfo,
        },
      })
      .pipe(
        map(({ data }) => {
          return data.updateUser;
        }),
      );
  }
  findUserById(id) {
    return this.apollo
      .query<any>({
        query: FIND_USER_BY_ID,
        variables: {
          id,
        },
      })
      .pipe(
        map(({ data }) => {
          return data.findUserById;
        }),
      );
  }
  usersInGroup(group_id, page, sort) {
    return this.apollo
      .query<any>({
        query: GET_USERS_IN_GROUP,
        variables: {
          group_id,
          page,
          sort,
        },
      })
      .pipe(
        map(({ data }) => {
          return data.usersInGroup;
        }),
      );
  }
}
