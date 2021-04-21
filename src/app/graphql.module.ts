import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { environment } from 'src/environments/environment';
import { ApolloLink } from '@apollo/client/core';
import { HttpHeaders } from '@angular/common/http';
import { onError } from '@apollo/client/link/error';

const uri = environment.GRAPHQL_URL; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const http = httpLink.create({ uri });
  const middleware = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${localStorage.getItem('token') || null}`,
      ),
    });
    const error = onError(({ networkError }) => {
      console.log('networkError---->', networkError);
      if (networkError) {
        // log out
      }
    });

    const link = error.concat(http);
    return forward(operation);
  });

  const link = middleware.concat(http);

  return {
    link,
    cache: new InMemoryCache(),
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
