import { ChangeEvent, FormEvent, useState } from 'react'
import { getUser } from '../services/userServices'
import { User } from '../types/User'
import { useLocation } from 'wouter'
import { useUser } from '../hooks/useUser'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [location, navigate] = useLocation()
  const { login } = useUser()

  async function handleLogin(ev: FormEvent) {
    ev.preventDefault()

    if (username !== '' && password !== '') {
      getUser(username, password).then((user: User) => {
        login(user).then(() => navigate('/admin-panel/home', { replace: true }))
      })
    } else {
      alert('Please complete both "username" and "password" fields')
    }
  }

  function handlePasswordInput(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.currentTarget.value)
  }

  function handleUsernameInput(event: ChangeEvent<HTMLInputElement>) {
    setUsername(event.currentTarget.value)
  }

  return (
    <section className="h-dvh w-full flex flex-col gap-5 justify-center items-center bg-blue-950">
      <h1 className="text-white text-3xl">Admin Panel</h1>
      <div className="w-96 h-80 flex bg-white rounded-md">
        <form
          onSubmit={handleLogin}
          className="flex-auto flex flex-col justify-center items-center m-5"
        >
          <label className="w-full mt-2" htmlFor="username">
            Username
            <input
              onChange={handleUsernameInput}
              className="bg-blue-300 w-full h-10 rounded-md px-2"
              type="text"
              name="username"
              placeholder="alejo9601"
            />
          </label>
          <label className="w-full mt-2" htmlFor="password">
            Password
            <input
              onChange={handlePasswordInput}
              className="bg-blue-300 w-full h-10 rounded-md px-2"
              type="password"
              name="password"
              placeholder="***********"
            />
          </label>
          <input
            className="bg-cyan-950 text-white mt-6 px-5 py-2 self-end rounded-md cursor-pointer"
            type="submit"
            value="Login"
          />
        </form>
      </div>
    </section>
  )
}

export default Login
