const getStateList = ({ state, commit }, payload) => {
  return state.axios.get(`states`).then(res => {
    commit('SET_STATE_LIST', res.data.data)
  })
}

const saveState = ({ state, commit }, payload) => {
  const request = {
    title: payload.title,
    code: payload.code
  }

  if (payload._id) {
    return state.axios.put(`states/${payload._id}`, request).then(res => {
      commit('SET_STATE', payload)
      commit('UPD_STATE_LIST', payload)
    })
  } else {
    return state.axios.post(`states`, request).then(res => {
      commit('SET_STATE', payload)
      commit('UPD_STATE_LIST', payload)
    })
  }
}

const deleteState = ({ state, commit }, payload) => {
  return state.axios.delete(`states/${payload._id}`, { data: payload }).then(res => {
    commit('DEL_STATE', payload)
  })
}

export {
  getStateList,
  saveState,
  deleteState
}
