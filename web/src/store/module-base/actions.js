const setLangSelected = ({ commit }, payload) => {
  commit('SET_LANG_SELECTED', payload.langCode)
}

export {
  setLangSelected
}
