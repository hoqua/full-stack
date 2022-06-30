import { createClient, fetchExchange, ssrExchange, TypedDocumentNode } from 'urql'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { DocumentNode } from 'graphql'
import { SSRData } from '@urql/core/dist/types/exchanges/ssr'
import { isAuthError } from './shared'

type SsrResult = GetServerSidePropsResult<{ urqlState?: SSRData }>
type SsrQuery<D, V> = DocumentNode | TypedDocumentNode<D, V> | string
type SsrContext = GetServerSidePropsContext

export async function serverQuery<
  QueryResult = { [key: string]: unknown },
  Variables = { [key: string]: unknown }
>(
  query: SsrQuery<QueryResult, Variables>,
  variables?: Variables,
  context?: SsrContext
): Promise<SsrResult> {
  const ssrCache = ssrExchange({ isClient: false })
  const cookie = context.req.headers.cookie
  const serverClient = createClient({
    url: `http://${process.env.API_HOST}:3333/graphql`,
    fetchOptions: { headers: { cookie } },
    exchanges: [ssrCache, fetchExchange]
  })

  try {
    const { error } = await serverClient
      .query<SsrQuery<QueryResult, Variables>, Variables>(query, variables)
      .toPromise()

    if (!error) return { props: { urqlState: ssrCache.extractData() } }

    if (isAuthError(error)) {
      context.res.setHeader('set-cookie', ['token='])
      context.res.setHeader('set-cookie', ['token-expires='])
      return { redirect: { permanent: false, destination: '/login' } }
    }
  } catch (error) {
    console.log('server side query unexpected error', error)
  }

  return { redirect: { permanent: false, destination: '/error' } }
}
