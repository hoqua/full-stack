import React, { FC } from 'react'
import {
  cacheExchange,
  createClient,
  errorExchange,
  fetchExchange,
  Provider,
  ssrExchange
} from 'urql'
import { isAuthError } from './shared'
const isClient = typeof window !== 'undefined'

export const ssrCache = ssrExchange({
  isClient,
  initialState: isClient ? window['__URQL_DATA__'] : undefined
})

export const clientApi = createClient({
  url: `http://${process.env.API_HOST}:3333/graphql`,
  fetchOptions: { credentials: 'include' },
  exchanges: [
    cacheExchange,
    ssrCache,
    errorExchange({
      onError: (error) => {
        if (isAuthError(error)) {
          console.log('//TODO: log off')
        }
      }
    }),
    fetchExchange
  ]
})

export const withApi = (Component: FC) => {
  return function ApiWrappedComponent({ ...properties }) {
    if (properties.urqlState) {
      ssrCache.restoreData(properties.urqlState)
    }

    return (
      <Provider value={clientApi}>
        <Component {...properties} />
      </Provider>
    )
  }
}
