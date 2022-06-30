import { useState } from 'react'
import { useSignUpMutation } from '../../api/auth/auth.gql.gen'
import { withApi } from '../../api/client-api'

export const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [, signUp] = useSignUpMutation()

  const login = async (event) => {
    event.preventDefault()
    await signUp({ args: { email, password } })
  }
  return (
    <div
      className="login-form"
      style={{
        display: 'flex',
        height: '100vh',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <form
        onSubmit={login}
        className="form-group"
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <hr />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <hr />

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  )
}

export default withApi(SignUp)
