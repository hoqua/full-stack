import { GetUsersDocument, useGetUsersQuery } from '../../api/user/user.gql.gen'
import { withApi } from '../../api/client-api'
import { GetServerSidePropsContext } from 'next'
import { serverQuery } from '../../api/server-api'

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  return serverQuery(GetUsersDocument, {}, context)
}

export const UsersPage = () => {
  const [data] = useGetUsersQuery({ variables: {} })

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw'
      }}
    >
      <div>
        <h1>Users:</h1>
        <hr />
        {data?.data?.users.map((user) => (
          <div key={user.id}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>ID: {user.id}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  )
}

export default withApi(UsersPage)
