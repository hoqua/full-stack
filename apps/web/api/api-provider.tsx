import React, {FC} from 'react';
import {cacheExchange, createClient, fetchExchange, Provider,} from 'urql';

export const clientApi = createClient({
  url: 'http://localhost:3333/graphql',
  exchanges: [
    cacheExchange,
    fetchExchange,
  ],
});

export const withApi = (Component: FC) => {
  return function ApiWrappedComponent({ ...properties }) {
    return (
      <Provider value={clientApi}>
        <Component {...properties} />
      </Provider>
    );
  };
};
