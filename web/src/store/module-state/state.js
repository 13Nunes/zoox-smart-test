import Vue from 'vue'

export default function () {
  return {
    axios: Vue.prototype.$axios,
    stateObj: {},
    stateLst: []
  }
}
