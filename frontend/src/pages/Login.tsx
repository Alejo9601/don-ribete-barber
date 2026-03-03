import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { loginUser } from '../services/userServices'
import { useLocation } from 'wouter'
import { useUser } from '../hooks/useUser'

const bypassAdminAuth = import.meta.env.VITE_BYPASS_ADMIN_AUTH === 'true'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [, navigate] = useLocation()
  const { login, user } = useUser()

  useEffect(() => {
    if (bypassAdminAuth) {
      navigate('/admin-panel/home', { replace: true })
    }
  }, [navigate])

  useEffect(() => {
    if (user !== undefined) {
      navigate('/admin-panel/home', { replace: true })
    }
  }, [navigate, user])

  async function handleLogin(ev: FormEvent) {
    ev.preventDefault()

    if (username !== '' && password !== '') {
      try {
        setIsSubmitting(true)
        const user = await loginUser(username, password)
        await login(user)
      } catch (_error) {
        setErrorMessage('Invalid credentials')
      } finally {
        setIsSubmitting(false)
      }
    } else {
      alert('Please complete both "username" and "password" fields')
    }
  }

  function handlePasswordInput(event: ChangeEvent<HTMLInputElement>) {
    setErrorMessage('')
    setPassword(event.currentTarget.value)
  }

  function handleUsernameInput(event: ChangeEvent<HTMLInputElement>) {
    setErrorMessage('')
    setUsername(event.currentTarget.value)
  }

  return (
    <section className="flex min-h-dvh items-center justify-center bg-zinc-950 px-6 py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(8,145,178,0.16),transparent_32%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.04),transparent_25%)]"></div>
      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-zinc-900/85 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur">
        <div className="mb-8 space-y-3">
          <span className="inline-flex rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-zinc-400">
            Patagon Barber
          </span>
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold text-white">Admin Login</h1>
            <p className="text-sm leading-6 text-zinc-400">
              Access appointments and manage the admin panel.
            </p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          {errorMessage ? (
            <p className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {errorMessage}
            </p>
          ) : null}
          <label className="flex flex-col gap-2" htmlFor="username">
            <span className="text-sm font-medium text-zinc-300">Username</span>
            <input
              onChange={handleUsernameInput}
              className="h-12 rounded-2xl border border-white/10 bg-black/20 px-4 text-sm text-white placeholder:text-zinc-500 transition focus:border-cyan-500/70"
              type="text"
              name="username"
              placeholder="Enter your username"
              autoComplete="username"
            />
          </label>
          <label className="flex flex-col gap-2" htmlFor="password">
            <span className="text-sm font-medium text-zinc-300">Password</span>
            <input
              onChange={handlePasswordInput}
              className="h-12 rounded-2xl border border-white/10 bg-black/20 px-4 text-sm text-white placeholder:text-zinc-500 transition focus:border-cyan-500/70"
              type="password"
              name="password"
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </label>
          <button
            className="mt-2 h-12 rounded-2xl bg-cyan-600 text-sm font-semibold text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:bg-cyan-800/70"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Login'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default Login
