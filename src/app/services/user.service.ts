import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { VERIFY_CODE } from '../graphql';
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
}
