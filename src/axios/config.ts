const envs = import.meta.env
const baseURL = `http${envs.SSL ? 's' : ''}://${envs.VUE_APP_HOST}:${envs.VUE_APP_PORT}`

export default {
  baseURL,
  Headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
}
