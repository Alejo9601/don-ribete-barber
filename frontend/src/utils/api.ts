export function getApiUrl(path: string) {
  const baseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

  return `${baseUrl}${path}`
}
