import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { CREATE_GROUP, MY_JOINED_GROUPS } from '../graphql';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(private apollo: Apollo) {}

  createGroup(groupInfo) {
    return this.apollo
      .mutate<any>({
        mutation: CREATE_GROUP,
        variables: {
          groupInfo,
        },
      })
      .pipe(
        map(({ data }) => {
          return data.createGroup;
        }),
      );
  }

  getMyJoinedGroups(page, sort) {
    return this.apollo
      .query<any>({
        query: MY_JOINED_GROUPS,
        variables: {
          page,
          sort,
        },
      })
      .pipe(
        map(({ data }) => {
          return data.joinedGroups;
        }),
      );
  }
}
