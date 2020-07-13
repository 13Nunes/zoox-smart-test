import Vue from 'vue'

export default function () {
  return {
    axios: Vue.prototype.$axios,
    lastJwtCheck: new Date(1900, 1, 1),
    isLoading: true,
    langSelected: null
  }
}
