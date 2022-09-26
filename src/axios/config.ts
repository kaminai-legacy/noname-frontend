const envs = import.meta.env
const VITE_SSL =
  typeof envs.VITE_SSL === 'string' ? envs.VITE_SSL.toLocaleLowerCase() === 'true' : envs.VITE_SSL

let baseURL = `http${VITE_SSL ? 's' : ''}://${envs.VITE_APP_HOST}`
envs.VITE_APP_PORT && `${baseURL}:${envs.VITE_APP_PORT}`

export default {
  baseURL,
  Headers: {
    'X-Requested-With': 'XMLHttpRequest',
    Accept: 'application/json',
  },
}
